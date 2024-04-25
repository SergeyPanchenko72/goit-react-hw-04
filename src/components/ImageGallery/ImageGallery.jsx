import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items, openModal }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard item={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
