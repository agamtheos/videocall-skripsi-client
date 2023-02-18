export const getErrorMessage = (e) => {
    const {data} = e?.response ?? {};
    const {message} = data ?? {};
    return message ? message : 'Terjadi kesalahan, silahkan coba lagi';
}