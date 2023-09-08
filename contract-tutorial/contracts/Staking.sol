// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Staking {
  uint256 private totalStaked;
  mapping(address => uint256) public stakedAmounts;

  event Staked(address indexed account, uint256 amount);
  event UnStaked(address indexed account, uint256 amount);
    
  /**
    Stake تمثل مقدار الرموز أو الأثير الذي يريد المستخدم مشاركته في uint256 من النوع amount_  تأخذ الدالة وسيطة واحدة

    أكبر من الصفر مما يضمن عدم قدرة المستخدم على إيداع كمية سلبية _amount مما إذا كان require تحقق البيانات المسبقة الأولى    

    الذي يتم إيداعه بواسطة المستخدم عن طريق ربط عنوانهم بالمبلغ الذي يملكونه _amount باستخدام stakedAmounts إليه كما يحدث الدالة تحديثًا على التناظر الذي يسمى _amount عن طريق إضافة totalStaked تحدث الدالة بعد ذلك تحديثًا لمتغير
  */
  function stake(uint256 _amount) public payable {
    require(_amount > 0);
    require(msg.value >= _amount, "Staked amount must match the value being sent.");

    totalStaked += _amount;
    stakedAmounts[msg.sender] += _amount;
    (bool success, ) = payable(msg.sender).call{value: (msg.value - _amount)}("");
    require(success, "Failed!");
    emit Staked(msg.sender, _amount);
  }
    
  /**
    وتأخذ معامل واحد وهو مقدار الرموز الذي يريد المستخدم إلغاء رهنها في العقد unstake الوظيفة تسمى

    بفرض أن لدى المستخدم الرموز المرهونة الكافية ستقوم الوظيفة بتحديث إجمالي المبلغ المرهون وطرح المبلغ المراد إلغاؤه من تعيين مقدار الرموز المرهونة للمستخدم
  */
  function unstake() public payable {
    require(stakedAmounts[msg.sender] > 0, "Not enough staked amount to unstake.");

    uint256 _amount = stakedAmounts[msg.sender];
    payable(msg.sender).transfer(_amount);
    totalStaked -= _amount;
    stakedAmounts[msg.sender] -= _amount;
    emit UnStaked(msg.sender, _amount);
  }

  /**
    في العقد الذكي Stake تقوم هذه الدالة بإرجاع إجمالي الرموز التي تم عمل لها
  */
  function getTotalStaked() public view returns (uint256) {
    return totalStaked;
  }

  receive() external payable {}

  fallback() external payable {}
}
