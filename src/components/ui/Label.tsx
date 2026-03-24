interface LabelProps {
  text: string;
}

export default function Label({ text }: LabelProps) {
  return (
    <div className="font-semibold text-center px-[40px] py-[3px] bg-surface rounded-[26px]">
      {text}
    </div>
  );
}
