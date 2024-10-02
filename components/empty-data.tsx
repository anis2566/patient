interface Props {
  message: string;
}

export const EmptyData = ({ message }: Props) => {
  return (
    <div className="flex h-[30vh] w-full items-center justify-center text-center italic text-muted-foreground">
      {message}
    </div>
  );
};
