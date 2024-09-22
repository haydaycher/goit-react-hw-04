import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ articles, openModal }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {articles.map((item) => (
          <li key={item.id} onClick={() => openModal(item)}>
            <ImageCard article={item} />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
