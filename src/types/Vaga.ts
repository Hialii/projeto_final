export interface Vaga {
    id: number;
    title: string;
    description: string;
    isOpen: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateVagaRequest {
    title: string;
    description: string;
    isOpen: boolean;
  }
  
  export interface EditVagaRequest {
    title?: string;
    description?: string;
    isOpen?: boolean;
  }