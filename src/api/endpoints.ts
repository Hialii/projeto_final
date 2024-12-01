const API_ENDPOINTS = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        EDIT: "/auth/user",
        LOGOUT: "/auth/logout",
    },
    VAGAS: {
        GET_VAGAS: "/vagas", // Corrigido para a URL correta
        CREATE_VAGA: "/vagas", // Mesmo ajuste aqui
        UPDATE_VAGA: (id: number) => `/vagas/${id}`, // Ajuste para usar a URL correta
        DELETE_VAGA: (id: number) => `/vagas/${id}`, // Ajuste para usar a URL correta
    },
  };
  
  export default API_ENDPOINTS;
  