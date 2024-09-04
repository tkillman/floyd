import { forwardRef, useImperativeHandle, useState } from 'react';
import { StyledInput } from './InputComponent.style';

interface Props {
  handleDraw?: (count: number) => void;
}

export interface RefInputComponent {
  getCount: () => number;
}

const MIN_VALUE = 2;
const MAX_VALUE = 50;

const InputComponent: React.ForwardRefRenderFunction<
  RefInputComponent,
  Props
> = (props, ref) => {
  const [count, setCount] = useState<string>(String(MIN_VALUE));

  const onChangeCount: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    if (!value) {
      setCount('');
      return;
    }

    setCount(value);
  };

  useImperativeHandle(ref, () => ({
    getCount: () => {
      return Number(count ? count : 0);
    },
  }));

  const onClickDraw = () => {
    const numCount = Number(count ? count : 0);

    if (numCount < MIN_VALUE || numCount > MAX_VALUE) {
      alert(`최소 ${MIN_VALUE} 이상, ${MAX_VALUE} 이하의 값을 입력해주세요.`);
      return;
    }

    props.handleDraw?.(Number(count ? count : 0));
  };

  return (
    <div>
      <label htmlFor="nodeCount">노드 수 입력: </label>
      <StyledInput
        type="number"
        id="nodeCount"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={count}
        onChange={onChangeCount}
      />
      <button type="button" onClick={onClickDraw} disabled={!count}>
        그래프 그리기
      </button>
    </div>
  );
};

export default forwardRef(InputComponent);
