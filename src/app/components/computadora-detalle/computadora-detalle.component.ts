import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Computadoras } from '../../models/computadora.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { DocxViewerComponent } from '../docx-viewer/docx-viewer.component';
import { XlsxViewerComponent } from '../xlsx-viewer/xlsx-viewer.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../services/safeUrl';

@Component({
  selector: 'app-computadora-detalle',
  templateUrl: './computadora-detalle.component.html',
  styleUrls: ['./computadora-detalle.component.scss'],
  imports: [CommonModule, FormsModule, PdfViewerComponent, DocxViewerComponent, XlsxViewerComponent, SafeUrlPipe],
  standalone: true,
})
export class ComputadoraDetalleComponent {
  computadora: Computadoras | null = null;
  archivos: any[] = [];
  currentSeccion: string = '';
  selectedPdf: string | null = null;
  selectedDocx: string | null = null;
  selectedXlsx: string | null = null;
  selectedVideo: SafeResourceUrl | null = null;
  selectedSoftware: string | null = null;
  selectedImage: string | null = null; // Nueva propiedad para imágenes seleccionadas

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  private ocultarTimeout: any; // Variable para reiniciar el tiempo

  async ngOnInit() {
      const computadoraId = this.route.snapshot.paramMap.get('id');
      if (computadoraId) {
          this.computadora = await this.firestoreService.getComputadoraById(computadoraId);
      }

      // Bloquear clic derecho (PC y móviles)
      document.addEventListener('contextmenu', (event) => event.preventDefault());

      // Bloquear descargas de imágenes en móviles
      document.addEventListener('touchstart', (event) => {
          if (event.target instanceof HTMLImageElement) {
              event.preventDefault();
          }
      });

      // Detectar teclas sospechosas (PC)
      document.addEventListener('keydown', (event) => {
          const teclasSospechosas = [
              'p', 's', '3', '4', 'PrintScreen', 'Print', 'Snapshot', 'PrtSc', 'PrtScn', 'PrtScr'
          ];

          if (teclasSospechosas.includes(event.key) || event.ctrlKey || event.metaKey || event.shiftKey) {
              event.preventDefault();
              this.mostrarAlerta();
              this.activarBloqueoPantalla();
          }
      });

      // Detectar captura de pantalla indirectamente (PC y móviles)
      document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
              this.activarBloqueoPantalla();
          }
      });

      // Detectar pérdida de foco de la ventana (PC y móviles)
      window.addEventListener('blur', () => {
          this.activarBloqueoPantalla();
      });

      // Detectar captura de pantalla en Android (solo funciona en algunas versiones)
      if (navigator.userAgent.toLowerCase().includes('android')) {
          document.addEventListener('visibilitychange', () => {
              if (document.hidden) {
                  this.activarBloqueoPantalla();
              }
          });
      }
  }

  // Método para mostrar una alerta visual
  mostrarAlerta() {
      const alerta = document.createElement('div');
      alerta.style.position = 'fixed';
      alerta.style.top = '20px';
      alerta.style.left = '50%';
      alerta.style.transform = 'translateX(-50%)';
      alerta.style.backgroundColor = 'red';
      alerta.style.color = 'white';
      alerta.style.padding = '10px 20px';
      alerta.style.borderRadius = '5px';
      alerta.style.zIndex = '1000';
      alerta.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
      alerta.textContent = 'No está permitido capturar pantallas. Si continúas, serás penalizado.';

      document.body.appendChild(alerta);
      setTimeout(() => {
          document.body.removeChild(alerta);
      }, 5000);
  }

  // Método para activar el bloqueo de pantalla
  activarBloqueoPantalla() {
      const contenido = document.querySelector('.div1') as HTMLElement;
      if (!contenido) return;

      contenido.classList.add('oculto');

      clearTimeout(this.ocultarTimeout);
      this.ocultarTimeout = setTimeout(() => {
          contenido.classList.remove('oculto');
      }, 5000);
  }


  async loadArchivos(seccion: string) {
    if (!this.computadora?.id) return;
    this.currentSeccion = seccion;

    try {
      this.archivos = await this.firestoreService.getArchivos(this.computadora.id, seccion);
    } catch (error) {
      console.error(`Error al cargar archivos de la sección ${seccion}:`, error);
    }
  }

  viewArchivo(archivoUrl: string) {
    if (!archivoUrl) {
      console.error('El archivo no tiene una URL válida.');
      alert('El archivo no tiene una URL válida.');
      return;
    }

    const extension = archivoUrl.split('.').pop()?.toLowerCase();
    this.selectedPdf = null;
    this.selectedDocx = null;
    this.selectedXlsx = null;
    this.selectedVideo = null;
    this.selectedSoftware = null;
    this.selectedImage = null; // Reinicia la selección de imágenes

    if (archivoUrl.includes('youtube.com/watch')) {
      const videoId = archivoUrl.split('v=')[1]?.split('&')[0];
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      } else {
        console.error('No se pudo extraer el ID del video de la URL:', archivoUrl);
        alert('La URL del video no es válida.');
      }
      return;
    }

    switch (extension) {
      case 'pdf':
        this.selectedPdf = archivoUrl;
        break;
      case 'docx':
      case 'doc':
        this.selectedDocx = archivoUrl;
        break;
      case 'xlsx':
      case 'xls':
        this.selectedXlsx = archivoUrl;
        break;
      case 'mp4':
      case 'webm':
      case 'mov':
        this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(archivoUrl);
        break;
      case 'exe':
      case 'zip':
      case 'rar':
        this.selectedSoftware = archivoUrl;
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        this.selectedImage = archivoUrl; // Asigna la URL de la imagen
        break;
      default:
        console.error('Formato de archivo no compatible:', extension);
        alert('El formato de archivo no es compatible.');
    }
  }

  getFileIcon(url: string): string {
    if (url.includes('youtube.com/watch')) {
      return 'assets/icons/video.png'; // Ícono para videos de YouTube
    }

    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'assets/icons/pdf.png';
      case 'docx':
      case 'doc':
        return 'assets/icons/word.png';
      case 'xlsx':
      case 'xls':
        return 'assets/icons/exel.png';
      case 'mp4':
      case 'webm':
      case 'mov':
        return 'assets/icons/video.png';
      case 'exe':
      case 'zip':
      case 'rar':
        return 'assets/icons/soft.png'; // Ícono para software
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'assets/icons/img.png'; // Ícono para imágenes
      default:
        return 'assets/icons/soft.png'; // Ícono para software
    }
  }



}
