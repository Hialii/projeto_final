import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

import { Vaga, CreateVagaRequest, EditVagaRequest } from "../../types/Vaga";

export const listarVagas = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.VAGAS.GET_VAGAS);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar vagas", error);
      throw new Error("Erro ao buscar vagas");
    }
  };

// Criar uma vaga
export const criarVaga = async (data: CreateVagaRequest): Promise<Vaga> => {
  const response = await axiosInstance.post(API_ENDPOINTS.VAGAS.CREATE_VAGA, data);
  return response.data;
};

// Editar uma vaga
export const editarVaga = async (id: number, data: EditVagaRequest): Promise<Vaga> => {
  const response = await axiosInstance.put(API_ENDPOINTS.VAGAS.UPDATE_VAGA(id), data);
  return response.data;
};

// Deletar uma vaga
export const deletarVaga = async (id: number): Promise<void> => {
  await axiosInstance.delete(API_ENDPOINTS.VAGAS.DELETE_VAGA(id));
};
