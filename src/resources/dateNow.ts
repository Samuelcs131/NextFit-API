const dateBrazil: string = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format().split('/').reverse().join('-')
const hoursBrazil: string = Intl.DateTimeFormat('pt-BR', { timeStyle: 'medium' }).format()
const dateNow: Date = new Date(dateBrazil + 'T' + hoursBrazil)
dateNow.setHours(dateNow.getHours() - 3)

export default dateNow
