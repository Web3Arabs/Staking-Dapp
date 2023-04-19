import { useEffect } from 'react';
import Web3 from 'web3';
import { contractAddress, contractABI } from '../info';

export default function Home() {
  // Ethereum الاتصال بشبكة
  const web3 = new Web3(Web3.givenProvider);

  // يعمل هذا على اخذ مثيل للعقد بحيث نتمكن من التفاعل مع البلوكتشين
  const contract = new web3.eth.Contract(contractABI, contractAddress)

  // stake تعمل هذه الدالة بعمل
  async function deposit() {
    // Ethereum استدعاء الحساب المتصل بشبكة
    const accounts = await web3.eth.getAccounts();
    // (يمكنك تحديدها كما تريد) ETH التي تم كتابتها في العقد الذكي وإرسال مبلغ معين من stake التفاعل مع الدالة
    const result = await contract.methods.stake(web3.utils.toWei("0.005", "ether")).send({ from: accounts[0], value: web3.utils.toWei("0.005", "ether") });
    // طباعة النتيجة
    console.log(result);
  }

  // unstake تعمل هذه الدالة بعمل
  async function withdraw() {
    // Ethereum استدعاء الحساب المتصل بشبكة
    const accounts = await web3.eth.getAccounts();
    // التي تم كتابتها في العقد الذكي unstake التفاعل مع الدالة
    const result = await contract.methods.unstake().send({ from: accounts[0] });
    // طباعة النتيجة
    console.log(result);
  }

  // DApp تعمل هذه الدالة على عملية اتصال المحفظة بتطبيق
  const connect = async () => {
    const accounts = await window.ethereum.enable()
    return accounts[0]
  }

  // تمثل المصفوفة في نهاية استدعاء الوظيفة ما هي تغييرات الحالة التي ستؤدي إلى هذا التغيير
  // في هذه الحالة كلما تغيرت قيم الوظيفتين سيتم استدعاء هذا التغيير مباشرة
  useEffect(() => {
    connect()
  }, [])

  return (
    <div>
      <h1>Deposit 0.005 ETH</h1>
      <button onClick={deposit}>Deposit</button>

      <h1>Withdraw all my Deposit</h1>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  )
}