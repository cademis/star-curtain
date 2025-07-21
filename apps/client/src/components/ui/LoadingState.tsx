type Props = {
  title: string;
  message: string;
};

export function LoadingState({ title, message }: Props) {
  return (
    <>
      <div>{title}</div>
      <div>{message}</div>
    </>
  );
}
