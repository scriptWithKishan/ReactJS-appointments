// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: new Date(),
    isFiltered: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachEle => {
        if (eachEle.id === id) {
          return {...eachEle, isStared: !eachEle.isStared}
        }
        return eachEle
      }),
    }))
  }

  onClickFilterAppointment = () => {
    this.setState(prevState => ({
      isFiltered: !prevState.isFiltered,
    }))
  }

  render() {
    const {appointmentList, title, date, isFiltered} = this.state
    let filteredAppointedList
    if (isFiltered) {
      filteredAppointedList = appointmentList.filter(
        eachEle => eachEle.isStared,
      )
    } else {
      filteredAppointedList = appointmentList
    }

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="appointment-input-container">
            <div>
              <h1 className="input-head">Add Appointment</h1>
              <form onSubmit={this.onSubmitAppointment}>
                <label htmlFor="inputTitle">TITLE</label>
                <input
                  required
                  type="text"
                  value={title}
                  placeholder="Title"
                  id="inputTitle"
                  onChange={this.onChangeTitle}
                />
                <lable htmlFor="inputDate">DATE</lable>
                <input
                  label="Date"
                  required
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyyy"
                  id="inputDate"
                  onChange={this.onChangeDate}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <div>
              <img
                className="appointment-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-list-container">
            <div className="appointment-stared-container">
              <h1 className="appointment-list-head">Appointments</h1>
              <button
                className="list-stared-btn"
                type="button"
                onClick={this.onClickFilterAppointment}
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredAppointedList.map(eachEle => (
                <AppointmentItem
                  key={eachEle.id}
                  onClickStar={this.onClickStar}
                  appointmentDetails={eachEle}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
