
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  setDoc,
  collectionData,
  startAfter, limit, DocumentData,
  getDoc
} from '@angular/fire/firestore';
import { UserI } from '../models/users.models';

import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Computadoras } from '../models/computadora.model';
import { ConsultaI } from '../models/consultas.model';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private preciosDocId = 'VD5K0j4QwvEeuUubztak';
  constructor(private firestore: Firestore, private storage: Storage) {}


  // 🔹 Obtener los precios del documento único
async getPrecios(): Promise<{ consultas: number; suscripciones: number; consultas_tec: number } | null> {
  try {
    const preciosRef = doc(this.firestore, `precios/${this.preciosDocId}`);
    const preciosSnap = await getDoc(preciosRef);

    if (preciosSnap.exists()) {
      return preciosSnap.data() as { consultas: number; suscripciones: number; consultas_tec: number };
    } else {
      console.error('El documento de precios no existe.');
      return null;
    }
  } catch (error) {
    console.error('Error obteniendo los precios:', error);
    return null;
  }
}
  // Usuario
  // Eliminar un usuario
  async deleteUser(user: UserI): Promise<void> {
  try {
    if (!user || !user.id) {
      throw new Error('El usuario o el ID de usuario es nulo o no está definido.');
    }
    const userRef = doc(this.firestore, 'usuarios', user.id);
    await deleteDoc(userRef);
    console.log(`Usuario eliminado: ${user.id}`);
  } catch (error) {
    console.error('Error eliminando el usuario:', error);
    throw error;
  }
  }

// Computadoras
   // Obtener todas las computadoras
   async getComputadoras(): Promise<Computadoras[]> {
    const computadorasSnapshot = await getDocs(
      query(collection(this.firestore, 'computadoras'), orderBy('nombre'))
    );
    return computadorasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Computadoras[];
  }

  // Añadir una nueva computadora
  async addComputadora(computadora:Computadoras, imagen: File): Promise<Computadoras> {
    try {
      if (imagen) {
        const storageRef = ref(this.storage, `computadoras/${imagen.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imagen);
        await uploadTask;
        computadora.imagen = await getDownloadURL(storageRef);
      }
      const id = uuidv4(); // Generar un id único
      const docRef = doc(this.firestore, `computadoras/${id}`);
      await setDoc(docRef, { ...computadora, id });
      console.log(`Computadora añadida con id: ${id}`);
      return { ...computadora, id };
    } catch (error) {
      console.error('Error añadiendo la computadora:', error);
      throw error;
    }
  }

  // Actualizar una computadora existente
  async updateComputadora(computadora: Computadoras, imagen?: File): Promise<void> {
    try {
      if (!computadora.id) {
        throw new Error('La computadora debe tener un id para ser actualizada.');
      }

      if (imagen) {
        // Eliminar la imagen anterior si existe
        if (computadora.imagen) {
          const storageRef = ref(this.storage, computadora.imagen);
          await deleteObject(storageRef);
        }

        // Subir la nueva imagen
        const newStorageRef = ref(this.storage, `computadoras/${imagen.name}`);
        const uploadTask = uploadBytesResumable(newStorageRef, imagen);
        await uploadTask;
        computadora.imagen = await getDownloadURL(newStorageRef);
      }

      const computadoraRef = doc(this.firestore, 'computadoras', computadora.id);
      await updateDoc(computadoraRef, { ...computadora });
    } catch (error) {
      console.error('Error actualizando la computadora:', error);
    }
  }

  // Eliminar una computadora
  async deleteComputadora(computadora: Computadoras): Promise<void> {
    try {
      if (!computadora || !computadora.id) {
        throw new Error('La computadora o el id de la computadora es null o undefined.');
      }

      console.log(`Intentando eliminar la computadora con id: ${computadora.id}`);

      if (computadora.imagen) {
        const storageRef = ref(this.storage, computadora.imagen);
        await deleteObject(storageRef);
        console.log(`Imagen eliminada: ${computadora.imagen}`);
      }

      const computadoraRef = doc(this.firestore, 'computadoras', computadora.id);
      await deleteDoc(computadoraRef);
      console.log(`Computadora eliminada: ${computadora.id}`);
    } catch (error) {
      console.error('Error eliminando la computadora:', error);
    }
  }

  async addArchivo(computadoraId: string, seccion: string, archivo: File) {
    const storageRef = ref(this.storage, `computadoras/${computadoraId}/${seccion}/${archivo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, archivo);
    await uploadTask;
    const url = await getDownloadURL(storageRef);

    const docRef = doc(collection(this.firestore, `computadoras/${computadoraId}/${seccion}`));
    await setDoc(docRef, { nombre: archivo.name, url });
  }

  async getArchivos(computadoraId: string, seccion: string): Promise<any[]> {
    const archivosSnapshot = await getDocs(collection(this.firestore, `computadoras/${computadoraId}/${seccion}`));
    return archivosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }


// Obtener una computadora por su ID
async getComputadoraById(id: string): Promise<Computadoras | null> {
  try {
    const docRef = doc(this.firestore, 'computadoras', id); // Referencia al documento
    const docSnap = await getDoc(docRef); // Obtener el documento

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Computadoras; // Devolver los datos con el ID
    } else {
      console.log(`No se encontró una computadora con el ID: ${id}`);
      return null; // Si no existe, devuelve null
    }
  } catch (error) {
    console.error('Error al obtener la computadora por ID:', error);
    throw error; // Manejar el error
  }
}




  async getSubscripcionPorId(subscriptionId: string): Promise<any> {
    try {
      const subscripcionSnapshot = await getDocs(
        query(
          collection(this.firestore, 'subscriptions'),
          where('subscriptionId', '==', subscriptionId)
        )
      );
      if (!subscripcionSnapshot.empty) {
        return subscripcionSnapshot.docs[0].data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo la suscripción:', error);
      throw error;
    }
  }

  async getConsultas(): Promise<ConsultaI[]> {
    const consultasSnapshot = await getDocs(collection(this.firestore, 'consultas'));
    return consultasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConsultaI[];
  }

  async deleteConsulta(id: string): Promise<void> {
    try {
      const consultaRef = doc(this.firestore, 'consultas', id);
      await deleteDoc(consultaRef);
      console.log(`Consulta eliminada: ${id}`);
    } catch (error) {
      console.error('Error eliminando consulta:', error);
      throw error;
    }
  }

  async addConsulta(consulta: ConsultaI): Promise<void> {
    try {
      const id = uuidv4();
      const consultaRef = doc(this.firestore, 'consultas', id);
      await setDoc(consultaRef, { ...consulta, id });
      console.log(`Consulta añadida con id: ${id}`);
    } catch (error) {
      console.error('Error añadiendo consulta:', error);
      throw error;
    }
  }
}




