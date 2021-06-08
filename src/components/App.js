import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({ target: {value} }) => {
    //update App's state.filters.type
    this.setState({ filters: {...this.state.filters, type: value} })
  }

  onFindPetsClick = () => {
    //should fetch a list of pets using fetch
    ///api/pets
    ///api/pets?type=cat
    //set app's state.pets with result of fetch
    let endpoint = '/api/pets';

  if (this.state.filters.type != 'all'){
    endpoint += `?type=${this.state.filters.type}`
  }

  fetch(endpoint)
  .then(r => r.json())
  .then(pets => this.setState({ pets: pets }))
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })
this.setState({ pets: pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick= {this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onChangeType={this.onChangeType} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
