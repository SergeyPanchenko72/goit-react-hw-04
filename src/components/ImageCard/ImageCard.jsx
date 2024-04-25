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
        width={340}
        height={240}
        onClick={() => {
          openModal(full);
        }}
      />
    </div>
  );
}
