export const handleAsyncError = (error, customMessage = "Ocurrió un error.") => {
    console.error("Error:", error);

    if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error("Error de servidor:", error.response.data);
        window.alert(`Error del servidor: ${error.response.data.error}`);
    } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("Error de solicitud:", error.request);
        window.alert("No se recibió respuesta del servidor. Inténtalo de nuevo más tarde.");
    } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error("Error en la configuración de la solicitud:", error.message);
        window.alert(customMessage);
    }
};

