export default function ImageCard({
  item: {
    alt_description,
    urls: { small, full },
  },
  openModal,
}) {
  return (
    <div>
      <img
        src={small}
        alt={alt_description}
        onClick={() => {
          openModal(full);
        }}
      />
    </div>
  );
}
