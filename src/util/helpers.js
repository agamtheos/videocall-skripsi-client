export const getDateFormat = (dateString, splitDateTime = false) =>
{
	if (dateString)
	{
		const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
		const d = new Date(dateString);
		const date = d.getDate();
		const month = monthNames[d.getMonth()];
		const year = d.getFullYear();
		const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
		const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
		const seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

		if (splitDateTime) return {
			month: `${date} ${month}`,
			date: `${date} ${month} ${year}`,
			time: `${hours}:${minutes}:${seconds}`,
            dateTime : `${date} ${month} ${year} ${hours}:${minutes}`,
            monthTime: `${date} ${month} ${hours}:${minutes}`,
		}
		return `${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
	}
	return null;
}

export const getInitials = (value) => {
	if (value)
	{
		let trimmedValue = value.trim().replace(/\s\s+/g, ' ');
		let spilttedValue = trimmedValue.split(' ');
		if (spilttedValue[1]) return `${spilttedValue[0].trim().charAt(0).toUpperCase()}${spilttedValue[1].trim().charAt(0).toUpperCase()}`;
		return trimmedValue.charAt(0).toUpperCase();
	}
	return null;
}

export const getErrorMessage = (e) => {
    const {data} = e?.response ?? {};
    const {message} = data ?? {};
    return message ? message : 'Terjadi kesalahan server, silahkan coba lagi beberapa saat';
}