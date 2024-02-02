import React from "react";
import "./card.scss";
import PropTypes from "prop-types";

function Card({ reservation, onCancel }) {
  const handleCancel = () => {
    // Appeler la fonction d'annulation avec l'ID de la réservation
    onCancel(reservation.id);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Salle: {reservation.gym_name}</h3>
      </div>
      <div className="card-body">
        <p>
          <strong>Ville:</strong> {reservation.city}
        </p>
        <p>
          <strong>Date de réservation:</strong>{" "}
          {new Date(reservation.reservation_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Heure de réservation:</strong> {reservation.reservation_heure}
        </p>
        <button type="button" className="button-cancel" onClick={handleCancel}>
          Annuler la réservation
        </button>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    gym_name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    reservation_date: PropTypes.string.isRequired,
    reservation_heure: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
