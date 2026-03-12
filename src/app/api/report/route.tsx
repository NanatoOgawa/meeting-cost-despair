import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const attendees = searchParams.get('attendees') || '5';
  const hours = searchParams.get('hours') || '1.0';
  const cost = searchParams.get('cost') || '0';
  const conclusion = searchParams.get('conclusion') || 'Slackで済む内容でした';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: '60px',
          border: '20px solid #000',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            borderBottom: '8px solid #000',
            paddingBottom: '20px',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: '900',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '10px',
            }}
          >
            無駄会議・損害報告書
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '60px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', fontSize: '30px', borderBottom: '2px solid #ccc' }}>
              <span style={{ fontWeight: 'bold', marginRight: '20px' }}>参加者:</span> {attendees} 名
            </div>
            <div style={{ display: 'flex', fontSize: '30px', borderBottom: '2px solid #ccc' }}>
              <span style={{ fontWeight: 'bold', marginRight: '20px' }}>経過時間:</span> {hours} 時間
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', fontSize: '30px', borderBottom: '2px solid #ccc' }}>
              <span style={{ fontWeight: 'bold', marginRight: '20px', color: '#8B0000' }}>確定損害額:</span> ￥{cost}
            </div>
            <div style={{ display: 'flex', fontSize: '30px', borderBottom: '2px solid #ccc' }}>
              <span style={{ fontWeight: 'bold', marginRight: '20px' }}>判定:</span> 資源の無駄遣い
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            backgroundColor: '#f0f0f0',
            padding: '30px',
            borderLeft: '15px solid #8B0000',
            fontSize: '35px',
            fontStyle: 'italic',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          結論：{conclusion}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '20px',
            color: '#666',
          }}
        >
          絶望の会議コスト計算機 によって生成
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
