import React, { useEffect, useState } from "react";
import "./homepage.scss";
import background from "../../assets/main.gif";
import Carousel from "../../components/carousel";
import salle1 from "../../assets/Salle1.jpg";
import salle2 from "../../assets/Salle2.jpg";
import salle3 from "../../assets/Salle3.jpg";
import salle4 from "../../assets/Salle4.jpg";
import salle5 from "../../assets/Salle5.jpg";
import salle6 from "../../assets/Salle6.jpg";
import coachun from "../../assets/coachun.jpg";
import coachdeux from "../../assets/coachdeux.jpg";
import coachquatre from "../../assets/coach4.jpg";

const { VITE_BACKEND_URL } = import.meta.env;

function Homepage() {
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/gym`);
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const result = await response.json();

        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGym();
  }, []);

  // eslint-disable-next-line no-restricted-syntax
  console.log(data);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const gymImages = [salle1, salle2, salle3, salle4, salle5, salle6];

  return (
    <div className="main-homepage">
      <div className="gif-homepage">
        <img src={background} alt="Main GIF" />
      </div>
      <div className="presentation-homepage">
        <div className="text-presentation-homepage">
          <h1>Bienvenue sur CodeFit</h1>
          <p>
            Votre portail vers une vie active et énergique ! CodeFit simplifie
            votre parcours vers le fitness en vous offrant la possibilité
            exclusive de réserver des créneaux de coaching personnalisé dans les
            meilleures salles de sport de votre région.
          </p>
          {showMore && (
            <>
              <p>
                Explorez la liberté de choisir parmi une variété de centres de
                fitness, de cours spécialisés et d'activités, le tout à portée
                de clic. Que vous soyez passionné de cardio, adepte du
                renforcement musculaire ou amateur de cours collectifs, CodeFit
                vous connecte aux installations idéales pour vous aider à
                atteindre vos objectifs de remise en forme.
              </p>
              <p>
                Notre plateforme conviviale vous permet de consulter les
                horaires des coachs certifiés, de réserver des créneaux adaptés
                à votre emploi du temps chargé, et de profiter d'une expérience
                sportive sans tracas. CodeFit vous donne la flexibilité de
                personnaliser votre programme d'entraînement selon vos besoins
                uniques, le tout encadré par des coachs professionnels.
              </p>
              <p>
                Rejoignez-nous dès maintenant et découvrez une nouvelle manière
                de vivre le fitness. Inscrivez-vous sur CodeFit, réservez vos
                séances de coaching dans les meilleures salles de sport de votre
                région, et transformez votre routine d'entraînement en une
                aventure motivante.
              </p>
              <p>
                CodeFit : Parce que votre bien-être mérite une approche
                personnalisée. Commencez votre voyage avec nous aujourd'hui !
              </p>
            </>
          )}
          <button
            type="button"
            className="button-depliant"
            onClick={toggleShowMore}
          >
            {showMore ? "Réduire" : "En savoir plus"}
          </button>
        </div>
        <div className="image-presentation-homepage">
          <div className="image-presentation-homepage-one">
            {" "}
            <img src={coachun} alt="coachUn" className="coach-un" />
            <img src={coachdeux} alt="coachDeux" className="coach-deux" />
          </div>
          {showMore && (
            <div className="image-presentation-homepage-two">
              <img src={coachquatre} alt="coachDeux" />
            </div>
          )}
        </div>
      </div>
      <div className="line" />
      <div className="gym-homepage">
        <h1>Réservez votre séance </h1>
        <Carousel data={data} images={gymImages} />
      </div>
    </div>
  );
}

export default Homepage;
