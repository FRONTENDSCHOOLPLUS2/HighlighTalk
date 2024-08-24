import { OrderDataType } from '@/types/order';
import { CharacterBlue, CharacterRed } from '@public/image';

interface TransactionItemPropType {
  order: OrderDataType;
  index: number;
}

function ChargeItem({ order }: { order: OrderDataType }) {
  return (
    <>
      {/* "가입 축하 코인" 같은 표시해야 할 내용이 있으면 content에 넣습니다. */}
      <div className="left-contents">
        <CharacterBlue />
        <div>
          <div className="descrpition">
            <h3 className="title">{order.content ? order.content : '코인 충전'}</h3>
            <p className="subtitle">{order.payment_method} </p>
          </div>
          <p className="date">{order.createdAt.substring(0, 10)}</p>
        </div>
      </div>
      <div className="right-contents">
        <b>+{order.coin_amount}</b>
        <p>적립</p>
        {/* <p>전: {order.extra.balance_before} </p>
        <p>후: {order.extra.balance_after} </p> */}
      </div>
    </>
  );
}

function PayItem({ order }: { order: OrderDataType }) {
  return (
    <>
      <>
        {/* "가입 축하 코인" 같은 표시해야 할 내용이 있으면 content에 넣습니다. */}
        <div className="left-contents">
          <CharacterRed />
          <div>
            <div className="descrpition">
              <h3 className="title">{order.content ? order.content : '상품 결제'}</h3>
              {/* payment_method 이름으로 들어가지만 결제상품명을 의미합니다 */}
              <p className="subtitle">{order.payment_method} </p>
            </div>
            <p className="date">{order.createdAt.substring(0, 10)}</p>
          </div>
        </div>
        <div className="right-contents ">
          <b className="pay">-{order.coin_amount}</b>
          <p>사용</p>
          {/* <p>전: {order.extra.balance_before} </p>
        <p>후: {order.extra.balance_after} </p> */}
        </div>
      </>
    </>
  );
}

function TransactionItem({ order, index }: TransactionItemPropType) {
  return (
    <li key={index} className="transaction-item">
      {order.order_type === 'charge' ? <ChargeItem order={order} /> : <PayItem order={order} />}
    </li>
  );
}
export default TransactionItem;
