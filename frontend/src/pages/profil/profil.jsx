/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import "./profil.scss";
import decoun from "../../assets/deco1.jpg";
import decodeux from "../../assets/deco2.jpg";
import Card from "../../components/card/card";

const { VITE_BACKEND_URL } = import.meta.env;

function Profil() {
  const [isShowMainBody, setIsShowMainBody] = useState(true);
  const token = JSON.parse(localStorage.getItem("user"));
  const [dataAll, setDataAll] = useState([]);

  const handleShowMainBody = () => {
    setIsShowMainBody(true);
  };

  const handleShowMainBodyTwo = () => {
    setIsShowMainBody(false);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/user-gym`);
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const result = await response.json();

        setDataAll(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  // eslint-disable-next-line no-restricted-syntax
  console.log(dataAll);

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/user-gym/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // eslint-disable-next-line no-restricted-syntax
        console.log("Réservation annulée avec succès!");
      } else {
        console.error("Échec de l'annulation de la réservation");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return token ? (
    <div className="contain-profilpage">
      <div className="contain-profilpage-body">
        <div className="contain-profilpage-main">
          <div className="side-profilpage">
            <div className="side-name">Bonjour Quentin Vayssieres</div>
            <div className="side-navigation">
              <div className="side-links">
                {" "}
                <button
                  type="button"
                  className="btn-link"
                  onClick={handleShowMainBody}
                >
                  MON COMPTE
                </button>
              </div>
              <div className="side-links">
                {" "}
                <button
                  type="button"
                  className="btn-link"
                  onClick={handleShowMainBodyTwo}
                >
                  RESERVATIONS
                </button>
              </div>
            </div>
          </div>
          {isShowMainBody && (
            <div className="body-profilpage">
              <div className="main-title">
                <h2>Options du compte</h2>
              </div>
              <div className="main-body">
                <div className="main-first">
                  <div className="main-contain-form-login">
                    <label className="label" htmlFor="genre">
                      Genre
                      <select className="select" name="genre" id="genre">
                        <option>Mr</option>
                        <option>Mme</option>
                      </select>
                    </label>
                    <div className="row-form-login">
                      <label htmlFor="" className="label-form-input">
                        Prenom*
                      </label>
                      <input type="text" placeholder="John" />
                    </div>
                    <div className="row-form-login">
                      <label htmlFor="" className="label-form-input">
                        Nom*
                      </label>
                      <input type="text" placeholder="Doe" />
                    </div>
                    <div className="row-form-login">
                      <label htmlFor="" className="label-form-input">
                        Numéro de téléphone
                      </label>
                      <input type="text" placeholder="0606060606" />
                    </div>
                    <div className="row-form-login">
                      <label htmlFor="" className="label-form-input">
                        Votre e-mail*
                      </label>
                      <input type="text" placeholder="john@gmail.com" />
                    </div>
                    <div className="row-form-login">
                      <label htmlFor="" className="label-form-input">
                        Confirmer votre e-mail*
                      </label>
                      <input type="text" placeholder="" />
                    </div>
                  </div>
                  <div className="main-contain-action">
                    <img src={decoun} alt="un" />
                    <img src={decodeux} alt="deux" />
                  </div>
                </div>
                <button type="button" className="btn-action-modif">
                  ENREGISTRER LES MODIFICATIONS
                </button>
              </div>
            </div>
          )}
          {!isShowMainBody && (
            <div className="main-body-two">
              {dataAll.data
                .filter((reservation) => reservation.user_id === token.id)
                .map((reservation) => (
                  <Card
                    key={reservation.id}
                    reservation={reservation}
                    onCancel={handleCancelReservation(reservation.id)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p className="hackeur"> NON NON PETIT MALIN</p>
  );
}

export default Profil;
