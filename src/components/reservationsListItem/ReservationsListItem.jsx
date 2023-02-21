import "./reservationslistitem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import conferenceStockPhoto from "../../resources/AGT/images/conference-room-stock-photo.jpg";
import trainingStockPhoto from "../../resources/AGT/images/training-room-stock-photo.jpg";
import gymStockPhoto from "../../resources/AGT/images/gym-stock-photo.jpg";
import sleepingStockPhoto from "../../resources/AGT/images/sleeping-quarters-stock-photo2.jpg";
import {
  faDumbbell,
  faBed,
  faUsersBetweenLines,
  faPersonChalkboard,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { DEFAULT_NAMES, ERROR_MESSAGE, FACILITY_TYPES, FACILITY_TYPES_NAMES } from "../../utils/definitions.js";
import { useContext } from "react";
import { SitesContext } from "../../context/SitesContext";
import { AuthContext } from "../../context/AuthContext";

const ReservationsListItem = ({ reservationInfo }) => {
  const { sites } = useContext(SitesContext);
  const { user } = useContext(AuthContext)
  // const { name } = sites?.find( (item)=> (item._id === reservationInfo?.siteId))
  const sitesMatch = sites?.find( (item)=> (item._id === reservationInfo?.siteId))
  const siteName = sitesMatch?.name;
  const navigate = useNavigate();
  const roomId = reservationInfo?.roomId;
  const reservation = reservationInfo;
  const { data, loading, error } = useFetch(`/rooms/${roomId}?id=${user._id}`);

  const handleViewDetails = (e) => {
    e.preventDefault();
    navigate(`/reservations/${reservationInfo._id}`, {
      state: { roomId, reservation },
    });
  };
  return (
    <div className="rlListItem">
      <h4>
          {siteName}
      </h4>
      <div className="rlListItemType">
        <FontAwesomeIcon
          className="rlListItemTypeImg"
          icon={
            reservationInfo.facilityType === FACILITY_TYPES.CONFERENCE
              ? faUsersBetweenLines
              : reservationInfo.facilityType === FACILITY_TYPES.TRAINING
              ? faPersonChalkboard
              : reservationInfo.facilityType === FACILITY_TYPES.GYM
              ? faDumbbell
              : faBed
          }
        />
        <span>
          {reservationInfo.facilityType === FACILITY_TYPES.CONFERENCE
            ? FACILITY_TYPES_NAMES.CONFERENCE
            : reservationInfo.facilityType === FACILITY_TYPES.TRAINING
            ? FACILITY_TYPES_NAMES.TRAINING
            : reservationInfo.facilityType === FACILITY_TYPES.GYM
            ? FACILITY_TYPES_NAMES.GYM
            : FACILITY_TYPES_NAMES.SLEEPING_QUARTERS
          }
        </span>
      </div>
      <div className="rlListItemBox">
        <img
          src={
            reservationInfo.facilityType === FACILITY_TYPES.CONFERENCE
              ? conferenceStockPhoto
              : reservationInfo.facilityType === FACILITY_TYPES.TRAINING
              ? trainingStockPhoto
              : reservationInfo.facilityType === FACILITY_TYPES.GYM
              ? gymStockPhoto
              : sleepingStockPhoto
          }
          alt=""
          className="rlListItemBoxImg"
        />
        <div className="rlListItemBoxDesc">
          <span className="rlListItemDates">
            {`${format(
              new Date(reservationInfo.reservationStartTime),
              "MMM dd yyyy"
            )}`}
            |{`${format(new Date(reservationInfo.reservationStartTime), "p")}`}–
            {`${format(new Date(reservationInfo.reservationEndTime), "p")}`}
          </span>
          {loading ? (
            DEFAULT_NAMES.LOADING_MESSAGE
          ) : error ? (
            <>
              <span>{error.message}</span>
              <br />
              <span>{ERROR_MESSAGE.CONTACT}</span>
            </>
          ) : (
            <>
              <h4 className="rlListItemBoxName">{data.name}</h4>
              <span className="rlListItemSubtitle">{data.description}</span>
            </>
          )}
          <label>{reservationInfo.reservationStatus}</label>
        </div>
        <div className="rlListItemDetails">
          <button className="rlListItemDetailsBtn" onClick={handleViewDetails}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationsListItem;
