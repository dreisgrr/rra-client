import "./reservationdetails.css";
import requestUrl from "../../utils/requestMethods.js";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import RDetailsRoomInfo from "./RDetailsRoomInfo";
import ActionModal from "../../components/cancelModal/ActionModal";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ReservationContext } from "../../context/ReservationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
    reservationStatusActions,
    reservationStatus,
    ACTION_TYPES,
} from "../../utils/definitions.js";

const ReservationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { error, dispatch } = useContext(ReservationContext);

  const [reservation, setReservation] = useState(location.state.reservation);

  let start = new Date(reservation.reservationStartTime);
  let end = new Date(reservation.reservationEndTime);

  const [action, setAction] = useState("");
  const [remarks, setRemarks] = useState("");
  const [openActionModal, setOpenActionModal] = useState(false);

  const handlePassRemarks = (i) => {
    setRemarks(i);
  };

  const handleGoBack = () => {
    navigate("/reservations");
  };

  const handleActionModal = (e) => {
    setAction(e.target.name);
    e.preventDefault();
    setOpenActionModal(true);
  };

  const handleActionReservation = async (e) => {
    e.preventDefault();
    const { value } = reservationStatusActions.find(
      (item) => item.name === action
    );
    const payload = {
      reservationStatus: value,
      actionTaken: {
        performedBy: user.domainId,
        performedDate: new Date(),
        action: value,
        remarks: remarks,
      },
    };
    dispatch({ type: ACTION_TYPES.START });
    try {
      let config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: 'same-origin'
      }
      const res = await requestUrl.put(
        `/reservations/${reservation._id}?id=${user._id}`,
        payload, config
      );
      dispatch({ type: ACTION_TYPES.SUCCESS, payload: res.data });
      setReservation((prev) => ({ ...prev, payload }));
      setOpenActionModal(false);
      navigate(`/reservations`);
    } catch (error) {
      console.log(error);
      dispatch({ type: ACTION_TYPES.FAILURE, payload: error.response.data });
    }
  };

  return (
    <div className="rDetailsContainer">
      <div className="rDetailsWrapper">
        <div className="rDetailsActionBox">
          <h1 className="rDetailsTitle">Reservation Info</h1>
          <div className="rDetailsActionBoxItem">
            <label>Status</label>
            <div className="statusWrapper">
              <span
                className={
                  reservation.reservationStatus === reservationStatus.APPROVED
                    ? "rDetailsActionBoxItemStatus green"
                    : reservation.reservationStatus === reservationStatus.REJECTED ||
                      reservation.reservationStatus === reservationStatus.CANCELLED
                    ? "rDetailsActionBoxItemStatus red"
                    : "rDetailsActionBoxItemStatus"
                }
              >
                {reservation.reservationStatus}
              </span>
              <FontAwesomeIcon
                icon={
                  reservation.reservationStatus === reservationStatus.APPROVED
                    ? faCircleCheck
                    : reservation.reservationStatus === reservationStatus.REJECTED ||
                      reservation.reservationStatus === reservationStatus.CANCELLED
                    ? faCircleXmark
                    : faPaperPlane
                }
                className={
                  reservation.reservationStatus === reservationStatus.APPROVED
                    ? "statusWrapper green"
                    : reservation.reservationStatus === reservationStatus.REJECTED ||
                      reservation.reservationStatus === reservationStatus.CANCELLED
                    ? "statusWrapper red"
                    : "statusWrapper"
                }
              />
            </div>
          </div>
          {(reservation.reservationStatus === reservationStatus.CANCELLED ||
            reservation.reservationStatus === reservationStatus.REJECTED) && (
            <>
              <div className="rDetailsActionBoxItem">
                <label>Remarks</label>
                <span className="reservationRemarks">
                  {reservation.actionTaken.remarks}
                </span>
              </div>
            </>
          )}

          {user?.permissions.isAdmin ? (
            reservation.reservationStatus === reservationStatus.SUBMITTED ? (
              <>
                <button
                  name="approve"
                  className="rDetailsApproveBtn"
                  onClick={handleActionModal}
                >
                  Approve
                </button>
                <button
                  name="reject"
                  className="rDetailsRejectBtn"
                  onClick={handleActionModal}
                >
                  Reject
                </button>
              </>
            ) : reservation.reservationStatus === reservationStatus.APPROVED ? (
              <>
                <button
                  name="cancel"
                  className="rDetailsRejectBtn"
                  onClick={handleActionModal}
                >
                  Cancel
                </button>
              </>
            ) : (
              <></>
            )
          ) : (
            reservation.reservationStatus === reservationStatus.SUBMITTED && (
              <button
                name="cancel"
                className="rDetailsDefaultBtn"
                onClick={handleActionModal}
              >
                Cancel Reservation
              </button>
            )
          )}

          <button className="rDetailsDefaultBtn" onClick={handleGoBack}>
            Back
          </button>
        </div>
        <div className="rDetailsRightPanel">
          <div className="rDetailsPanelContainer">
            <div className="rDetailsItemsWrapper">
              <div className="rDetailsItemsColumn">
                <RDetailsRoomInfo reservationInfo={reservation} />
              </div>
              <div className="rDetailsItemsColumn">
                <div className="rDetailsItem">
                  <label>Date of request</label>
                  <span>{`${format(start, "MMM dd yyyy")}`}</span>
                </div>
                <div className="rDetailsItem">
                  <label>Start Time</label>
                  <span>{`${format(start, "p")}`}</span>
                </div>
                <div className="rDetailsItem">
                  <label>End Time</label>
                  <span>{`${format(end, "p")}`}</span>
                </div>
                <div className="rDetailsItem">
                  <label>Duration</label>
                  <span>{reservation.duration} hr/s</span>
                </div>
                <div className="rDetailsItem">
                  <label>Pax</label>
                  <span>{reservation.pax}</span>
                </div>
                <div className="rDetailsItem">
                  <label>Purpose</label>
                  <span>{reservation.purpose}</span>
                </div>
              </div>
              <div className="rDetailsItemsColumn">
                <div className="rDetailsItem">
                  <label>Requestor</label>
                  <span>{reservation.requestor}</span>
                </div>
                <div className="rDetailsItem">
                  <label>Position</label>
                  <span>Engineer Sr</span>
                </div>
                <div className="rDetailsItem">
                  <label>Shift Schedule</label>
                  <span>{reservation.shiftSchedule}</span>
                </div>
                <div className="rDetailsItem">
                  <label>Tower/LOB</label>
                  <span>{reservation.lineOfBusinessOrTower}</span>
                </div>
                <div className="rDetailsItem">
                  <label>Occupants</label>
                  <span>{reservation.occupants}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openActionModal && (
        <ActionModal
          action={action}
          openActionModal={setOpenActionModal}
          handleActionReservation={handleActionReservation}
          error={error}
          passRemarks={(i) => handlePassRemarks(i)}
        />
      )}
    </div>
  );
};

export default ReservationDetails;
