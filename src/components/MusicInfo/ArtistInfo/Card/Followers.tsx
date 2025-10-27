import compactNumberFormat from '@/utils/string/compactNumberFormat';

const Followers = ({ followers }: { followers?: number }) => {
  if (followers == null) {
    return null;
  }
  return (
    <span className={'text-(length:--text-fluid-s) text-(--grey-700)'}>
      followers : {compactNumberFormat(followers)}
    </span>
  );
};

export default Followers;
