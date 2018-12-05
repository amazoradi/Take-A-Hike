
const remoteURL ="http://localhost:5002"
const foreignURL = "https://www.hikingproject.com/data/get-trails"

const APIManager = {

  getEntry(resourse, id, ...search) {
    return fetch(`${remoteURL}/${resourse}/${id}${search}`)
    .then(data => data.json())
  },

  getAllEntries(resourse, ...search) {
    return fetch(`${remoteURL}/${resourse}${search}`)
    .then(data => data.json())
  },
  
  deleteEntry(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`, { 
      method: "DELETE"
     })
      .then(data => data.json())
  },

  addEntry(resource, newThing) {
    return fetch(`${remoteURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newThing)
    }).then(data => data.json())
  },

  editEntry(resource, id, editedThing) {
    return fetch(`${remoteURL}/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedThing)
    })
  },

   getSearchedHikes(...search) {
    return fetch(`${foreignURL}${search}`)
    .then(data => data.json())
  },

}

export default APIManager