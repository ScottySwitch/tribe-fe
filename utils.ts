export const getIndex = (id, list) => {
  return list.findIndex((item) => item.id === id)
}

export const randomId = () => Math.floor(Math.random() * 10000000)

