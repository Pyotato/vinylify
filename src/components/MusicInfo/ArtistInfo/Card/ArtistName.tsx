const ArtistName = ({ artistName = '' }: { artistName?: string }) => {
  return (
    <span className={'text-(length:--text-fluid-l) block w-full'}>
      {artistName}{' '}
    </span>
  );
};

export default ArtistName;
