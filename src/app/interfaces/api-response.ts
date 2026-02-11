export interface ApiResponse {
    ok:       boolean;
    message:  null;
    data:     User;
    permises: null;
}

export interface User {
    usuario:        string;
    id_rol:         string;
    rol:            string;
    token:          string;
    nombre_publico: string;
    opcion:         string;
    grupo:          string;
    accion:         string;
}
