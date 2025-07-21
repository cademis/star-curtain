type Props = {
  title: string;
  message: string;
};

export function ErrorState({ title, message }: Props) {
  return (
    <>
      <div>{title}</div>
      <div>{message}</div>
    </>
  );
}
