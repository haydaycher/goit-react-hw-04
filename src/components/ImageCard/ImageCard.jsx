import css from "./ImageCard.module.css";
const ImageCard = ({ article }) => {
  const { urls, alt_description } = article;
  return (
    <div>
      <div className={css.card}>
        <img src={urls.small} alt={alt_description} className={css.image} />
      </div>
    </div>
  );
};

export default ImageCard;
