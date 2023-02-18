export const getErrorMessage = (e) => {
    const {data} = e?.response ?? {};
    const {message} = data ?? {};
    return message ? message : 'Terjadi kesalahan server, silahkan coba lagi beberapa saat';
}