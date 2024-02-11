export interface Props {
  imageUrl: any;
}

const PreviewPhoto = ({ imageUrl }: Props) => {
  return (
    <>
      <img
        src={imageUrl}
        alt="Product preview"
        style={{ maxHeight: '200px', maxWidth: '200px'}}
        className="mb-3"
      /> 
    </>
  )
}

export default PreviewPhoto
