// Write your code here
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStar} = props
  const {id, title, date, isStared} = appointmentDetails
  const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const markStared = () => {
    onClickStar(id)
  }

  const starImg = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="stared-container">
        <p className="title">{title}</p>
        <button type="button" className="star-btn" data-testid="star">
          <img
            className="star-img"
            src={starImg}
            alt="star"
            onClick={markStared}
          />
        </button>
      </div>
      <p className="date">{formatedDate}</p>
    </li>
  )
}

export default AppointmentItem
