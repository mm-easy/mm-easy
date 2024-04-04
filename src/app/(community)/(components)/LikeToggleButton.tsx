import { ToggleProps } from '@/types/posts';

const LikeToggleButton = ({ toggled, onToggle, onIcon, offIcon }: ToggleProps) => {
  return (
    <div>
      <button onClick={() => onToggle(!toggled)}>{toggled ? onIcon : offIcon}</button>
    </div>
  );
};

export default LikeToggleButton;
