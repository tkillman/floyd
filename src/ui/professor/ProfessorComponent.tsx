import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Matrix } from '~/src/domain/matrix.domain';
import { renderMatrixToTable } from '~/src/lib/dompurifyUtil';
import { matrixState } from '~/src/repository/matrix.recoil';
import FloydComponent from '../floyd/FloydComponent';
import styled from 'styled-components';

const ProfessorComponent = () => {
  const matrix = useRecoilValue(matrixState);
  const [floydMatrix, setFloydMatrix] = useState<Matrix>([]);
  const [step, setStep] = useState({ k: 0, a: 0, b: 0 });

  useEffect(() => {
    setFloydMatrix(matrix);

    return () => {
      setFloydMatrix([]);
    };
  }, [matrix]);

  const handleNextStep = () => {
    const nodeCount = floydMatrix.length;
    const { k, a, b } = step;

    setFloydMatrix((prev) =>
      produce(prev, (draft) => {
        // a에서 b로 가는 비용과 a에서 k를 거쳐 b로 가는 비용을 비교하여 더 작은 값을 선택
        draft[a][b] = Math.min(draft[a][b], draft[a][k] + draft[k][b]);
      })
    );

    // 다음 단계로 진행
    let nextK = k,
      nextA = a,
      nextB = b + 1;

    if (nextB >= nodeCount) {
      nextB = 0;
      nextA += 1;
    }
    if (nextA >= nodeCount) {
      nextA = 0;
      nextK += 1;
    }
    if (nextK >= nodeCount) {
      alert('플로이드-워셜 알고리즘 완료!');
      return;
    }

    setStep({ k: nextK, a: nextA, b: nextB });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '50px' }}>
        <Card>
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            D[0][2] === 0번 노드에서 2번 노드로 가는 최단거리는?
          </p>
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            1. 이차 배열에 수 담기{' '}
          </p>
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            2. 3중 반복문 사용하기{' '}
          </p>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            1. 이차 배열에 수 담기{' '}
          </p>
          <p>연결선이 있으면 값을 채우고 없으면 무한대를 넣는다.</p>
          <p>
            maxtrix :{' '}
            {JSON.stringify(matrix, null, 2)?.replace(/null/g, 'Infinity')}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: renderMatrixToTable(matrix, '거리 테이블', true),
            }}
          ></div>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            2. 3중 반복문 사용하기{' '}
          </p>
          <p>
            <span
              style={{ display: 'block' }}
            >{`for (let k = 0; k <span nodeCount; k++) {`}</span>
            <span
              style={{ display: 'block', paddingLeft: '20px' }}
            >{`for (let a = 0; a < nodeCount; a++) {`}</span>
            <span
              style={{ display: 'block', paddingLeft: '40px' }}
            >{`for (let b = 0; b < nodeCount; b++) {`}</span>
            <span
              style={{ display: 'block', paddingLeft: '60px' }}
            >{`D[a][b] = Math.min(D[a][b], D[a][k] + D[k][b]);`}</span>
            <span style={{ display: 'block', paddingLeft: '40px' }}>{`}`}</span>
            <span style={{ display: 'block', paddingLeft: '20px' }}>{`}`}</span>
            <span>{`}`}</span>
          </p>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            반복문 횟수(N의 3승) :{' '}
            {matrix.length * matrix.length * matrix.length}
          </p>
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            반복문 출발 <button onClick={handleNextStep}>start</button>
          </p>
          <p>
            1. k = {step.k}, a = {step.a}, b = {step.b}
          </p>
          <p>
            {`D[${step.a}][${step.b}] = Math.min(D[${step.a}][${step.b}], D[${step.a}][${step.k}] + D[${step.k}][${step.b}]);`}
          </p>
          <p>
            {`D[${step.a}][${step.b}] = Math.min(${
              floydMatrix?.[step.a]?.[step.b]
            } , ${floydMatrix?.[step.a]?.[step.k]} + ${
              floydMatrix?.[step.k]?.[step.b]
            })`}
          </p>
        </Card>
        <div
          dangerouslySetInnerHTML={{
            __html: renderMatrixToTable(floydMatrix, '최단 거리 테이블', true),
          }}
        ></div>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '10px solid black',
          }}
        >
          <p style={{ fontSize: '30px', fontWeight: 700 }}>정답보기</p>
          <FloydComponent isShowIndex={true} />
        </Card>
      </div>
    </div>
  );
};

export default ProfessorComponent;

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;
