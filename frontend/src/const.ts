import type { Proposal } from "./services/api"

export const mockSubgraphs = [
  {
    id: '1',
    name: 'Uniswap V3',
    description: 'Decentralized exchange protocol for automated liquidity provision',
    status: 'active' as 'active' | 'paused' | 'deprecated' | 'passed' | 'failed',
    queries: 1250000,
    lastUpdated: '2 hours ago',
    category: 'DeFi'
  },
  {
    id: '2',
    name: 'Compound V2',
    description: 'Algorithmic money markets protocol for lending and borrowing',
    status: 'active' as 'active' | 'paused' | 'deprecated' | 'passed' | 'failed',
    queries: 890000,
    lastUpdated: '1 hour ago',
    category: 'DeFi'
  },
  {
    id: '3',
    name: 'Aave V2',
    description: 'Decentralized non-custodial liquidity protocol',
    status: 'active' as 'active' | 'paused' | 'deprecated' | 'passed' | 'failed',
    queries: 750000,
    lastUpdated: '3 hours ago',
    category: 'DeFi'
  },
  {
    id: '4',
    name: 'OpenSea',
    description: 'NFT marketplace for digital collectibles and art',
    status: 'paused' as 'active' | 'paused' | 'deprecated' | 'passed' | 'failed',
    queries: 450000,
    lastUpdated: '1 day ago',
    category: 'NFT'
  },
  {
    id: '5',
    name: 'ENS',
    description: 'Ethereum Name Service for decentralized domain names',
    status: 'active' as 'active' | 'paused' | 'deprecated' | 'passed' | 'failed',
    queries: 320000,
    lastUpdated: '4 hours ago',
    category: 'DAO'
  },
  {
    id: '6',
    name: 'Axie Infinity',
    description: 'Play-to-earn gaming platform with NFT creatures',
    status: 'active' as 'active' | 'paused' | 'deprecated' | 'passed' | 'failed',
    queries: 280000,
    lastUpdated: '2 hours ago',
    category: 'Gaming'
  }
]


export const mockProposals: Proposal[] = [
    {
        "abstain_delegate_votes": null,
        "against_delegate_votes": null,
        "creation_time": null,
        "description": "# Unichain Co-Incentives Growth Management Plan \n[<img height=\"345\" width=\"690\" alt=\"232\" src=\"https://us1.discourse-cdn.com/flex016/uploads/uniswap1/optimized/2X/a/a674fe1bf594f1210d9ccf6d178f82ac7db18de0_2_690x345.jpeg\" />2322048×1024 415 KB](https://us1.discourse-cdn.com/flex016/uploads/uniswap1/original/2X/a/a674fe1bf594f1210d9ccf6d178f82ac7db18de0.jpeg \"232\")\n\n\n\n**Summary**\n\nFollowing the passage of the Unichain-USDS Growth Management Plan on [Snapshot](https://snapshot.box/#/s:uniswapgovernance.eth/proposal/0x537a301c4c94c1ec0b972bab558e2e36b1fa1111f0cbc4d5a59b0465f505c9ab) that echoed Unichain as the pillar of Uniswap’s growth strategy, recent months have been dedicated to refining and updating the proposal for Uniswap DAO, based on feedback from various stakeholders.\n\nWhen the proposal passed, Unichain held less than 20 million USDS; since then, we’ve seen strong growth to nearly 45 million USDS on Unichain. Our aim is to accelerate this growth through strategic deployment and secured incentives from the Spark ecosystem. We have opened up sUSDC as an additional avenue for growth as it utilizes the Sky ecosystem’s mechanism and contributes to the Sky ecosystem.\n\nAdditionally, we have raised the minimum KPIs to be more ambitious and implemented a self-imposed “No result, no reward” approach to promote fairness, collaboration, and success for Uniswap DAO.\n\n**Motivation**\n\nAfter a period of sharp growth, Unichain’s TVL has steadily declined from over $900 million USD TVL in July 2025 to nearly half that amount in early September. The introduction of USDS, sUSDS, and sUSDC creates opportunities for enhanced collaboration among DeFi protocols. Both sUSDS and sUSDC provide yield, funded by the Sky ecosystem. For example, if Unichain sUSDS TVL grows to $100 million, at the current 4.75% yield, this would cost Sky $4.75 million USD per year. sUSDS can be a crucial driver for Unichain’s DeFi ecosystem growth, offering a stable and scalable yield source.\n\nFurthermore, we strongly believe Uniswap DAO should guide and decide on incentive distribution. The basis is once per three months (with reduced frequency following feedback to avoid overwhelming the governance process, but potentially more frequent in the future), the strategy will be suggested to Uniswap DAO, where they can vote via Snapshot to support the incentive distribution or not.\n\n**Goal / Growth Strategy**\n\nThe strategy centers on coordinating with key protocols to expand the Unichain ecosystem, notably by utilizing Sky’s competitive base savings rate. With incentives from Uniswap DAO and relevant DeFi partners, this rate can be amplified further. While additional incentives are secured, partners have emphasized that Uniswap DAO’s support is essential.\n\n1. **Focus on optimizing incentive programs**\n\nAll co-incentive programs will be data-driven to ensure effective growth. Co-incentives will be spent with strategic reasoning and analytical support. Program updates will be shared once per month to communicate with the community.\n\n1. **Continuous improvement and optimization**\n\nBeyond monthly program updates, we’ll refine the strategy in real time, allowing for continuous improvement and optimization. KPI-driven growth will enable ongoing adjustment of both partnership targets and co-incentives distribution to ensure maximum ROI on spending. We will provide the report regarding strategy and rebalancing weekly.\n\nCurrently, the planned methodology for pools and lending markets is an incentive redistribution framework that reallocates a portion of rewards from the bottom 25% performing pools to the top 25% performing pools. This systematic rebalancing attracts more users, increases TVL, and improves overall bottomline metrics by concentrating incentives where they generate maximum impact.\n\nInstead of sending all reallocated rewards directly to the top-performing pools, up to 5% of the total value will be strategically reserved to seed emerging opportunities and strengthen smaller pools. No single test pool can receive more than 2% of the total value, ensuring diversification and controlled risk.\n\nStableLab leverages its deep ecosystem knowledge and ongoing market analysis to identify where these allocations can have the highest long-term impact. By backing promising new pools or overlooked markets at the right moment, these rewards can spark meaningful growth and unlock outsized upside for the protocol. Over time, these allocations fold back into the regular rebalancing cycle, ensuring the system continuously adapts while compounding value across the broader ecosystem.\n\nAs with the offchain proposal, Unichain DAO retains the ability to reject any proposed distribution if deemed necessary.\n\n**Budget and Duration**\n\nAs mentioned above, sUSDS and sUSDC provide yield funded by the Sky Ecosystem. For example, if sUSDS grows to $100 million, at the current yield rate of 4.75%, that would cost Sky $4.75 million USD per year. Contributions from various DeFi protocols would further grow Unichain, with Spark having committed to providing additional co-incentives.\n\nWe strongly believe the majority of the budget that Uniswap DAO provides should be tied to objective KPIs like USDS and sUSDS supply on Unichain, which is inherently tied to TVL.\n\nThe program will start with a budget of $1 million USD when the first Snapshot strategy vote passes after this onchain vote passes to kickstart the program. Therefore, only one-fourth of the budget will be fixed, and the remaining portion will be performance-based. The performance-based part will be paid when the agreed-upon KPIs are reached, and we request unlock by submitting on-chain proof.\n\nIn addition, 80% of the budget will be directly spent on co-incentives that focus on USDS and sUSDS growth to boost Unichain TVL and usage. For instance, additional yield for sUSDS to make sUSDS yield on Unichain more attractive, or an incentivized USDS and/or sUSDS pool such as UNI-USDS on Unichain.\n\nThe remaining 20% of the budget, would be used for operations and logistics–such as coordinating with partners and optimizing and reporting on the incentive program\n\n**KPIs**\n\nKPIs are intentionally set high to align with the DAO’s interests. Following growth in USDS, and to keep interests aligned and show our commitment, we have raised KPIs by three times (from $20 million to $60 million).\n\nOut of the potential $3,000,000 USD incentive-based payment:\n\n1. USDS and sUSDS / sUSDC combined supply reaches TVL above $60 million USD on Unichain\n\n\\- $1,000,000 USD unlock. 80% allocated to co-incentives.\n\n1. USDS and sUSDS combined supply reaches TVL above $100 million USD on Unichain\n\n\\- Additional $1,000,000 USD unlock. 80% allocated to co-incentives.\n\n1. USDS and sUSDS combined supply reaches TVL above $200 million USD on Unichain\n\n\\- Additional $1,000,000 USD unlock. 80% allocated to co-incentives.\n\n**Additional Accountability and Alignment regarding KPIs**\n\n1. We will provide monthly updates on co-incentive distribution relevant metrics, including:\n\n\\- 30 / 60 / 90-day TVL retention, with the goal of 60 % / 50 % / 40 % each of peak\n\n-Net new liquidity provider addresses, with the goal of more than 1200 addresses by the end of the program\n\n-Δ TVL / $ incentive (ROI), ≥ $12 TVL gain per $1 variable spend, measured 30 d after each unlock\n\n1. The total payment will first go to UAC, the fixed payment will be disbursed at once in order to kickstart the co-incentive program.\n2. Upon achieving a KPI, we will submit a request to UAC with supporting proof.\n3. We will provide the report regarding strategy and rebalancing weekly.",
        "for_delegate_votes": 0,
        "id": "91",
        "proposer": {
            "delegated_votes_raw": null,
            "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9",
            "number_votes": null,
            "token_holders_represented_amount": null
        },
        "quorum_votes": null,
        "state": "ACTIVE",
        "total_delegate_votes": null,
        "votes": [
            {
                "choice": "FOR",
                "id": "0x0100e22f222753f6021abeb3f7e4af4c57467cc9-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x010dc5440ad49f9ec0dd325b622d9fd225944ee4-91",
                "reason": "N/A",
                "weight": 1957957500000000000
            },
            {
                "choice": "FOR",
                "id": "0x01de6487b3888e599f8145a7eca94da74837071c-91",
                "reason": null,
                "weight": 2562236789222585300
            },
            {
                "choice": "FOR",
                "id": "0x0579a616689f7ed748dc07692a3f150d44b0ca09-91",
                "reason": null,
                "weight": 1144968078912039400000
            },
            {
                "choice": "FOR",
                "id": "0x070341aa5ed571f0fb2c4a5641409b1a46b4961b-91",
                "reason": null,
                "weight": 2126115361707889000000
            },
            {
                "choice": "FOR",
                "id": "0x07475d68f282cf0da580af9784a28e180e1c4ed4-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x0940e77c7a784c65a9726b7a4e6852c7e05276cc-91",
                "reason": null,
                "weight": 3059415186921210400
            },
            {
                "choice": "ABSTAIN",
                "id": "0x0a0f04a231efbc29e1db7d086300ff550211c2f6-91",
                "reason": null,
                "weight": 46241847731945810000000
            },
            {
                "choice": "FOR",
                "id": "0x0de74ef8a6d719c544019e253afdafcfb7d23db3-91",
                "reason": null,
                "weight": 31411299715943824
            },
            {
                "choice": "FOR",
                "id": "0x1056e5c3d42d582b3dacf27336b16d63999b8a26-91",
                "reason": null,
                "weight": 390438099720170940
            },
            {
                "choice": "FOR",
                "id": "0x11069c08dd30aa4c17d73b0e3984a433a0e39fda-91",
                "reason": null,
                "weight": 402925517216111460000
            },
            {
                "choice": "FOR",
                "id": "0x11b9dd6d3129eb740011b1a948adcbcb67758a10-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x12b30979b9a53bb0b42deaaa974ac9304fab0832-91",
                "reason": null,
                "weight": 3577631094910000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x134d35266e9075adc311182938f5f9083df6b65c-91",
                "reason": null,
                "weight": 194623777299749500
            },
            {
                "choice": "FOR",
                "id": "0x13bdae8c5f0fc40231f0e6a4ad70196f59138548-91",
                "reason": null,
                "weight": 1367418254552890800000000
            },
            {
                "choice": "FOR",
                "id": "0x147510ebb636d80bb080de8fbb3df2e925a26e15-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1523afb8e48cfad26700191495e2672f7140080f-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x17296956b4e07ff8931e4ff4ea06709fab70b879-91",
                "reason": "We are voting in favor of this proposal, consistent with the rationale provided in our Snapshot vote. We view it as a capital-efficient strategy to accelerate Unichain’s growth, making smart use of the Sky ecosystem’s existing sUSDS yield. Importantly, linking most of the budget to performance-based TVL targets ensures DAO spending is aligned with measurable outcomes. At this stage, the strategic opportunity to grow Unichain is clear and compelling, and we support moving this initiative forward.",
                "weight": 3002000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x182fcf35d9065375c0c74fccb13dffe912ca83b3-91",
                "reason": null,
                "weight": 459179480000000000000
            },
            {
                "choice": "FOR",
                "id": "0x18ffe0ef3ab518d59e29d672fddef0d0131578a0-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x19acb89cb4bd36f6e471c91585b95b966d33132e-91",
                "reason": null,
                "weight": 6313342662715411000
            },
            {
                "choice": "FOR",
                "id": "0x1a9ab967c5672622c55023ea2fcb892e60da2e4a-91",
                "reason": null,
                "weight": 4451494051519098000
            },
            {
                "choice": "FOR",
                "id": "0x1c05decb151a459e8b045a93f472d1b238204094-91",
                "reason": null,
                "weight": 268137336166465950
            },
            {
                "choice": "FOR",
                "id": "0x1f3d3a7a9c548be39539b39d7400302753e20591-91",
                "reason": "We vote FOR this proposal. \n\nIncentive programs are not usually effective in the long term, since when the money runs out, capital migrates to new opportunities.\n\nIn the case of this proposal, we like the idea of bringing in other protocols that partially fund the incentives, because it does not depend solely on Uniswap DAO to keep the rewards flowing.",
                "weight": 1066907643290773200000
            },
            {
                "choice": "FOR",
                "id": "0x21b3b193b71680e2fafe40768c03a0fd305efa75-91",
                "reason": null,
                "weight": 1033889903046935400000
            },
            {
                "choice": "FOR",
                "id": "0x21ff9d23e14f3ec0cfc90fa624ef224418fcc5a8-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x2f2f665974261c4129b1dc6c359bd259cd66f78a-91",
                "reason": null,
                "weight": 9686927431290747000
            },
            {
                "choice": "FOR",
                "id": "0x30f4337abe6f70890f4ac7ff77016d4b8edb42a6-91",
                "reason": null,
                "weight": 573350144700000000
            },
            {
                "choice": "FOR",
                "id": "0x363c2314d11fc1f983106a16c7307b0c5462af59-91",
                "reason": null,
                "weight": 1009630297867774300000
            },
            {
                "choice": "FOR",
                "id": "0x37b463feae69d547f7d9cc3ff4bcb309928bd54d-91",
                "reason": null,
                "weight": 6076568903573244000
            },
            {
                "choice": "FOR",
                "id": "0x38dcfa6b1263c33fbbc2bafd4882a7dd5027472d-91",
                "reason": null,
                "weight": 169331847913512600
            },
            {
                "choice": "FOR",
                "id": "0x3b3d96d7ba6d981ed0861e54d6298947b495f68f-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3ddc7d25c7a1dc381443e491bbf1caa8928a05b0-91",
                "reason": null,
                "weight": 1078828335558698100000
            },
            {
                "choice": "FOR",
                "id": "0x3e511c122d67213c3b3166ddd78d8625d03b2d8c-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a-91",
                "reason": null,
                "weight": 2503698022059954600000000
            },
            {
                "choice": "FOR",
                "id": "0x40534e513df8277870b81e97b5107b3f39de4f15-91",
                "reason": null,
                "weight": 500010583273870500000
            },
            {
                "choice": "AGAINST",
                "id": "0x418735fab2b5631355b8d136793bac69f400bc06-91",
                "reason": null,
                "weight": 5705965356345037000
            },
            {
                "choice": "FOR",
                "id": "0x458ceec48586a85fcfeb4a179706656ee321730e-91",
                "reason": null,
                "weight": 5092685841679252000000
            },
            {
                "choice": "FOR",
                "id": "0x465c63680f2a0b4277d9b4cecc3f3310e531a77f-91",
                "reason": null,
                "weight": 1132476476049441400
            },
            {
                "choice": "FOR",
                "id": "0x475e41b482afc82bae8025d09d128f30b680e10c-91",
                "reason": null,
                "weight": 4637206733087450
            },
            {
                "choice": "FOR",
                "id": "0x477e89659cd4433dcb9cb8a9c607b73413a3238b-91",
                "reason": null,
                "weight": 10973334766172532
            },
            {
                "choice": "FOR",
                "id": "0x4d12a4aad451c3209ed3a660e463ba71fef37d7c-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d32d90d6535bd4e7eabaa27ee72932cb214bbfa-91",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d4ac65513fee380c596ac9edfac588782831bdf-91",
                "reason": null,
                "weight": 727970815777275800
            },
            {
                "choice": "FOR",
                "id": "0x4d9ba778b7f121e58e5d3bb6aef514e035a7c7f5-91",
                "reason": null,
                "weight": 1134628983244555800
            },
            {
                "choice": "FOR",
                "id": "0x4dd7fc3a3b6457d1e67e3b046b2b0d2dcf25257d-91",
                "reason": null,
                "weight": 4958652039703373000
            },
            {
                "choice": "FOR",
                "id": "0x53da33f96ecffe1cdf3842883c9ba3ba3b49c14b-91",
                "reason": null,
                "weight": 1053782288398953100
            },
            {
                "choice": "FOR",
                "id": "0x5762f3074605df17aebe3f5bc8fc7f8702aca752-91",
                "reason": "The \"no result, no reward\" structure makes this a compelling and low-risk proposal. Tying the vast majority of funding directly to ambitious, measurable growth milestones is a highly accountable and capital-efficient way to drive real, sustainable growth for the Unichain ecosystem",
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x5769b60588a7c0e9ba18f1f7d31b0190158a65d9-91",
                "reason": null,
                "weight": 5519279479258599000
            },
            {
                "choice": "FOR",
                "id": "0x5a4b09693ccaa2c3218592d0bafa7788a01f4600-91",
                "reason": null,
                "weight": 2261706270942677800
            },
            {
                "choice": "FOR",
                "id": "0x5bb73e04b810527b14b87c37eff3d62481f2d416-91",
                "reason": null,
                "weight": 939364943184568000000
            },
            {
                "choice": "FOR",
                "id": "0x5e60b0140f8d37b1b1ea09c9cd8fe2f1f44d5d4c-91",
                "reason": null,
                "weight": 2983367257011890000
            },
            {
                "choice": "FOR",
                "id": "0x621113d749971d2423df66d6fb02f9c45d6aa6a7-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x66aa8bee5366b6b48811ae0dac9fe5e1eefe1621-91",
                "reason": null,
                "weight": 2500247840838060300000000
            },
            {
                "choice": "FOR",
                "id": "0x683a4f9915d6216f73d6df50151725036bd26c02-91",
                "reason": null,
                "weight": 5253359960496503000000000
            },
            {
                "choice": "FOR",
                "id": "0x6de8448e7d5f58af394cc9540abe703d0c955dfd-91",
                "reason": "You can find our full rationale here: https://gov.uniswap.org/t/proxy-prev-boardroom-delegate-platform/25385/22",
                "weight": 1204605350580866300000
            },
            {
                "choice": "FOR",
                "id": "0x6e4aaf7ab038512ee29989b3d1fc6ad8efc36f17-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0x6f9bb7e454f5b3eb2310343f0e99269dc2bb8a1d-91",
                "reason": null,
                "weight": 4003772567167137500000
            },
            {
                "choice": "FOR",
                "id": "0x72b4b2553b2a6c17b558e628ff5b6b7141a68658-91",
                "reason": null,
                "weight": 10762956274627004
            },
            {
                "choice": "FOR",
                "id": "0x768e4afbb8e8a8252aca1d35b6b2537e3df3caa4-91",
                "reason": null,
                "weight": 1002335369085796400
            },
            {
                "choice": "FOR",
                "id": "0x7a04bd08fc016eaf2fa2090bf52ddc26012517a8-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x7bb9dccc97052ddef05141897fe8313fd4ad0418-91",
                "reason": null,
                "weight": 26849820586372980000
            },
            {
                "choice": "FOR",
                "id": "0x7f21b3e952ae82d10f66e03a9b39d198728a31e0-91",
                "reason": null,
                "weight": 411704160510895550
            },
            {
                "choice": "FOR",
                "id": "0x8108bf9834b26e6272823437324caeaab8aae99d-91",
                "reason": null,
                "weight": 1652537757465360000
            },
            {
                "choice": "FOR",
                "id": "0x85401467fd3aeb683d9d42fa00a03a2b3782f8df-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8787fc2de4de95c53e5e3a4e5459247d9773ea52-91",
                "reason": null,
                "weight": 475459393922505360000000
            },
            {
                "choice": "FOR",
                "id": "0x88f659b4b6d5614b991c6404b34f821e10390ec0-91",
                "reason": null,
                "weight": 1049470354152832600
            },
            {
                "choice": "FOR",
                "id": "0x8d07d225a769b7af3a923481e1fdf49180e6a265-91",
                "reason": null,
                "weight": 3301841608581902500000000
            },
            {
                "choice": "FOR",
                "id": "0x8d1509e0240eba23cccd58941fa2b5d7ff1fc70f-91",
                "reason": null,
                "weight": 20145214124114190
            },
            {
                "choice": "FOR",
                "id": "0x8d59b9fc743cb2d80b47ad8bc0571432b45c68d2-91",
                "reason": null,
                "weight": 1011946059317999600
            },
            {
                "choice": "FOR",
                "id": "0x93e0990c31f0933ae4578901c4fce42ed3bcf6ee-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x9588b068b14e6397bb47ad3763f9fb5e2f7d7cae-91",
                "reason": null,
                "weight": 5432519924210020000
            },
            {
                "choice": "FOR",
                "id": "0x95d2538129c1fac1afebc5c765a406e5f28888f9-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa0d0d863ceaa8c65e579b75474c46dddc8e4604a-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xa280bf4efcf1d68594c600bd1104678d577d0cf8-91",
                "reason": null,
                "weight": 200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa62db7185896111d0fa25c89124a41bfdfb047d9-91",
                "reason": null,
                "weight": 10453952643293915000
            },
            {
                "choice": "FOR",
                "id": "0xa6ac718a9bc4f265f6e1297168e55d05d3722bf3-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xa6e8772af29b29b9202a073f8e36f447689beef6-91",
                "reason": "Optimism provided 2,000,000 OP to Spark to deploy on Optimism + Unichain. Those funds are already financing 1/3 of the yield on sUSDS on Unichain. We would prefer to see what USDS supply looks like after those user incentives are exhausted, and it doesn’t make sense to further subsidize users holding sUSDS on Unichain with the existing 7% yield. This is especially important given that neither sUSDS nor USDS appear to be integrated into the DeFi ecosystem on Unichain. There appears to not even be a Uniswap pool with USDS or sUSDS on Unichain, nor is USDS or sUSDS integrated in lending markets like Morpho or Euler on Unichain.",
                "weight": 51006521091245690000000
            },
            {
                "choice": "FOR",
                "id": "0xa8293dd8eb52564a35b8357a539146321b934153-91",
                "reason": null,
                "weight": 55285714880412120000
            },
            {
                "choice": "FOR",
                "id": "0xa8e17be2b11e744561859c9c31ea060ee30bf37c-91",
                "reason": null,
                "weight": 1014229838868808200
            },
            {
                "choice": "FOR",
                "id": "0xaa30037cdd4aa927a3b4df9065e662ebd73a2f53-91",
                "reason": null,
                "weight": 3434587510437592000
            },
            {
                "choice": "FOR",
                "id": "0xacc94d70faf5539197307bc6e01907e60d760b28-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xacdb292ed21b4adac6c7e8ea09178969567ac316-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xadd2f9a2c8b74cfb1b8e8fd563531a46b86a8995-91",
                "reason": null,
                "weight": 1204679061844809500
            },
            {
                "choice": "AGAINST",
                "id": "0xaf05b88ac16ad3272d7ade699db51d03c4ff9f91-91",
                "reason": null,
                "weight": 18882697840930816
            },
            {
                "choice": "FOR",
                "id": "0xb35659cbac913d5e4119f2af47fd490a45e2c826-91",
                "reason": "The Event Horizon Community voted FOR on this Proposal (ehUNI-70): EventHorizon.vote/vote/uniswap/ehUNI-70",
                "weight": 9218871607514396000000
            },
            {
                "choice": "FOR",
                "id": "0xb49f8b8613be240213c1827e2e576044ffec7948-91",
                "reason": null,
                "weight": 1609932839262387400000
            },
            {
                "choice": "FOR",
                "id": "0xb79294d00848a3a4c00c22d9367f19b4280689d7-91",
                "reason": null,
                "weight": 73781863475906250000000
            },
            {
                "choice": "FOR",
                "id": "0xb8542377534c1075a9bb535acbff6dd560a32799-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb933aee47c438f22de0747d57fc239fe37878dd1-91",
                "reason": null,
                "weight": 2515617579018067400000000
            },
            {
                "choice": "FOR",
                "id": "0xbb479c3a442f8f611c92fddd08494c131b74fb1e-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xbc525c94d5edd2aba3d5fbf64b5039e795b8d00f-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xbe6e0481e9fce3145977da0fa41d10269138d2a6-91",
                "reason": null,
                "weight": 11215451923729600
            },
            {
                "choice": "FOR",
                "id": "0xbef8f29e284b14817cf6e6a4e29fc93360ac9999-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc2cb4442a5e7046ac28fad475feced67eec7f660-91",
                "reason": null,
                "weight": 1300000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc3a2821727e9e5fa690f8c69c5d8e0899aa0e6ee-91",
                "reason": null,
                "weight": 8554287073301785
            },
            {
                "choice": "FOR",
                "id": "0xc4cd22191f27d2cbcab7ba7be07b3655688147bc-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc5547b4907418c2ec0c2a95bec6fee8354657759-91",
                "reason": "The \"no result, no reward\" structure makes this a compelling and low-risk proposal. Tying the vast majority of funding directly to ambitious, measurable growth milestones is a highly accountable and capital-efficient way to drive real, sustainable growth for the Unichain ecosystem",
                "weight": 2684200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc85032a2e77be215a095fc8b77c0e3e16bb69bf9-91",
                "reason": null,
                "weight": 138137818737413980
            },
            {
                "choice": "FOR",
                "id": "0xccfcdf6fb169c7dc94dc2b1880271b99c16544a2-91",
                "reason": null,
                "weight": 207214596109569730
            },
            {
                "choice": "FOR",
                "id": "0xd248a27d2bbacb0ff7d8d92d48a62d6a090832ae-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xd6368d2e97695a30678e5ec2668f23c05320522e-91",
                "reason": null,
                "weight": 12817244572586912
            },
            {
                "choice": "FOR",
                "id": "0xd67cb3bdcc300f10dd25fb62dadb8c9242f0d5b7-91",
                "reason": null,
                "weight": 5383032009988122000
            },
            {
                "choice": "FOR",
                "id": "0xd6b8d0e159b29074a5df734e590c9010a0069b80-91",
                "reason": null,
                "weight": 1000082394466016300
            },
            {
                "choice": "FOR",
                "id": "0xd71230207b61d8a72021b9fb509e469dc5ba1366-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xd8dea87ddcc0c3c1464ded6102e4d3e829d0ae41-91",
                "reason": null,
                "weight": 1159173663882110500
            },
            {
                "choice": "FOR",
                "id": "0xe18c849a113b15685858e5cd96096f902fd7d46b-91",
                "reason": null,
                "weight": 5470425155854999000
            },
            {
                "choice": "FOR",
                "id": "0xe22817a91a14d61cb3691954983663425f5513b1-91",
                "reason": null,
                "weight": 108326980206522610000
            },
            {
                "choice": "FOR",
                "id": "0xe6b84dad5d26de2712d0c524dab35610e71b452d-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xe8eeeada50b535f415d630791f330dabf3870877-91",
                "reason": null,
                "weight": 120609834265912580
            },
            {
                "choice": "FOR",
                "id": "0xe93d59cc0bcecfd4ac204827ef67c5266079e2b5-91",
                "reason": null,
                "weight": 2503462496044307300000000
            },
            {
                "choice": "FOR",
                "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9-91",
                "reason": null,
                "weight": 2504981137130972700000000
            },
            {
                "choice": "FOR",
                "id": "0xed2a92b65b1a489db637a0cd9f2a4bb80367aeaf-91",
                "reason": null,
                "weight": 250000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xed4ca23fe53a936f3b74906b731f730dfd269508-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xed5ccb9b4ab476ebcf1cd845f00273358429aa74-91",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xee2acdcd6c9d46e216ccaab94899f26234d258a7-91",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf070cd4b5ba73a6b6a939dde513f79862bffcd25-91",
                "reason": null,
                "weight": 14942500000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf4b0556b9b6f53e00a1fdd2b0478ce841991d8fa-91",
                "reason": null,
                "weight": 22462171997328257000
            },
            {
                "choice": "FOR",
                "id": "0xf51754d95c0b9bb416ab4915e9f10b04d04d29e5-91",
                "reason": null,
                "weight": 10171189839135048000
            },
            {
                "choice": "FOR",
                "id": "0xfffd05ae9db4d5f4e23e2f37395db2f87359bf5d-91",
                "reason": null,
                "weight": 8185069416993695000
            }
        ]
    },
    {
        "abstain_delegate_votes": null,
        "against_delegate_votes": null,
        "creation_time": null,
        "description": "# Establish Uniswap Governance as \"DUNI,\" a Wyoming DUNA\n\n## Summary\n\nThe Uniswap Foundation (\"UF\") proposes that Uniswap Governance adopt a Wyoming-registered Decentralized Unincorporated Nonprofit Association (\"DUNA\") as the legal structure for the Uniswap Governance Protocol. This new legal entity, called \"DUNI\", will be purpose-built to preserve Uniswap's decentralized governance structure while enabling engagement with the offchain world (e.g., entering into contracts, retaining service providers, and fulfilling any potential regulatory and tax responsibilities).\n\nIf adopted, DUNI will be a legal entity for Uniswap Governance that recognizes the binding validity of onchain Governance Proposals with the intention of providing certainty regarding its legal structure and intended liability protections for members of DUNI. Adopting DUNI does not, in any way, alter the Uniswap Protocol, the UNI token, or the core mechanics of onchain governance. Rather, it represents a significant step in equipping Uniswap Governance for the future.\n\nImportantly, establishing Uniswap Governance as a DUNA would bolster critical limited liability protections for governance participants. This step is intended to protect governance participants from potential personal exposure to possible legal or tax liabilities stemming from the collective action taken by Uniswap Governance. This is a critical step in de-risking engagement in Uniswap Governance without compromising decentralization.\n\n## Background & Motivation\n\nIn the Uniswap Unleashed roadmap, we described a vision for evolving Uniswap Governance. In this vision, Governance can turn on the protocol fee, fund innovation, form partnerships, and navigate legal obligations with confidence. While onchain governance is integral to Uniswap's credible neutrality, it has historically lacked the corresponding infrastructure for basic offchain coordination and formalized protection for its collective actions. To execute on our vision, we need something more.\n\nTo that end, over the past two years, the Uniswap Foundation has explored options for establishing a legal structure that is intended to:\n\n- Provide more clarity regarding liability protection for Uniswap Governance participants;\n- Maintain the primary authority of the Uniswap Governance protocol; and\n- Enable execution of offchain operations without introducing centralized points of control.\n\nAfter significant research, legal consultation, and community engagement, the Wyoming DUNA (passed into law in 2024) emerged as a credibly neutral and transparent option. It has been explicitly designed for decentralized protocol governance systems to gain legal legitimacy without compromising their core ethos.\n\nIn our research, we have worked closely with a firm called Cowrie, founded by David Kerr. Based in Cheyenne, Wyoming, Cowrie is composed of a team of regulatory and technical experts that provides legal, financial, and administrative support to decentralized protocols. David was instrumental in writing Wyoming's DUNA statute, and has worked directly with legislators to educate them on the intricacies of the DUNA, what it enables DAOs to accomplish, what DAOs are, why decentralization is important, etc. Cowrie's role in the context of DUNI is to act as an Administrator of DUNI - facilitating regulatory and tax compliance, tax filings, informational reporting, and operational infrastructure within the constructs of its authorizations.\n\n## Specification\n\nIf this proposal passes, the resulting onchain transaction will adopt a DUNA for Uniswap Governance. Specifically, it will:\n\n- Ratify the DUNA's Association Agreement establishing the rules of DUNI;\n- Execute a Ministerial Agent Agreement with the Uniswap Foundation; and\n- Execute an Administrator Agreement with Cowrie - Administrator Services; This includes the execution of a separate Administrator Agreement with David Kerr (CEO of Cowrie) for specific authorizations.\n\nAdditionally, the transaction will execute two transfers of UNI from the treasury, specifically:\n\n- $16.5m worth of UNI to a DUNI-owned wallet to prefund a legal defense budget and a tax compliance budget;\n- $75k worth of UNI to Cowrie for their services as compliance administrator.\n\nAll supporting documentation can be found on the [UF's website here](https://www.uniswapfoundation.org/duni).",
        "for_delegate_votes": null,
        "id": "90",
        "proposer": {
            "delegated_votes_raw": null,
            "id": "0x0459f41c5f09bf678d9c07331894de31d8c22255",
            "number_votes": null,
            "token_holders_represented_amount": null
        },
        "quorum_votes": null,
        "state": "EXECUTED",
        "total_delegate_votes": null,
        "votes": [
            {
                "choice": "FOR",
                "id": "0x93e0990c31f0933ae4578901c4fce42ed3bcf6ee-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x0100e22f222753f6021abeb3f7e4af4c57467cc9-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x010dc5440ad49f9ec0dd325b622d9fd225944ee4-90",
                "reason": "N/A",
                "weight": 1957957500000000000
            },
            {
                "choice": "FOR",
                "id": "0x01de6487b3888e599f8145a7eca94da74837071c-90",
                "reason": null,
                "weight": 2562236789222585300
            },
            {
                "choice": "FOR",
                "id": "0x0579a616689f7ed748dc07692a3f150d44b0ca09-90",
                "reason": null,
                "weight": 1144968078912039400000
            },
            {
                "choice": "FOR",
                "id": "0x070341aa5ed571f0fb2c4a5641409b1a46b4961b-90",
                "reason": null,
                "weight": 2126115361707889000000
            },
            {
                "choice": "FOR",
                "id": "0x0940e77c7a784c65a9726b7a4e6852c7e05276cc-90",
                "reason": null,
                "weight": 3059415186921210400
            },
            {
                "choice": "FOR",
                "id": "0x0a0f04a231efbc29e1db7d086300ff550211c2f6-90",
                "reason": null,
                "weight": 46241847731945810000000
            },
            {
                "choice": "AGAINST",
                "id": "0x0de74ef8a6d719c544019e253afdafcfb7d23db3-90",
                "reason": null,
                "weight": 31411299715943824
            },
            {
                "choice": "FOR",
                "id": "0x0dff98053ef265671fcfcf1d71dfdc17001454eb-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x1056e5c3d42d582b3dacf27336b16d63999b8a26-90",
                "reason": null,
                "weight": 390438099720170940
            },
            {
                "choice": "FOR",
                "id": "0x11069c08dd30aa4c17d73b0e3984a433a0e39fda-90",
                "reason": null,
                "weight": 402925517216111460000
            },
            {
                "choice": "FOR",
                "id": "0x12b30979b9a53bb0b42deaaa974ac9304fab0832-90",
                "reason": null,
                "weight": 3577631094910000000000
            },
            {
                "choice": "FOR",
                "id": "0x134d35266e9075adc311182938f5f9083df6b65c-90",
                "reason": null,
                "weight": 194623777299749500
            },
            {
                "choice": "FOR",
                "id": "0x13bdae8c5f0fc40231f0e6a4ad70196f59138548-90",
                "reason": null,
                "weight": 1367202034552890600000000
            },
            {
                "choice": "FOR",
                "id": "0x147510ebb636d80bb080de8fbb3df2e925a26e15-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1523afb8e48cfad26700191495e2672f7140080f-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x17296956b4e07ff8931e4ff4ea06709fab70b879-90",
                "reason": "https://gov.uniswap.org/t/curia-delegate-platform/24140/32",
                "weight": 3002000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x182fcf35d9065375c0c74fccb13dffe912ca83b3-90",
                "reason": null,
                "weight": 459179480000000000000
            },
            {
                "choice": "FOR",
                "id": "0x19acb89cb4bd36f6e471c91585b95b966d33132e-90",
                "reason": null,
                "weight": 6313342662715411000
            },
            {
                "choice": "FOR",
                "id": "0x1a9ab967c5672622c55023ea2fcb892e60da2e4a-90",
                "reason": null,
                "weight": 4451494051519098000
            },
            {
                "choice": "FOR",
                "id": "0x1b686ee8e31c5959d9f5bbd8122a58682788eead-90",
                "reason": null,
                "weight": 258558424453197270000000
            },
            {
                "choice": "FOR",
                "id": "0x1c05decb151a459e8b045a93f472d1b238204094-90",
                "reason": null,
                "weight": 268137336166465950
            },
            {
                "choice": "FOR",
                "id": "0x1d8f369f05343f5a642a78bd65ff0da136016452-90",
                "reason": null,
                "weight": 8000005814096098000000000
            },
            {
                "choice": "FOR",
                "id": "0x1e4942b1a4fab51ec950e5cccc957497b37d1103-90",
                "reason": null,
                "weight": 200000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1f3d3a7a9c548be39539b39d7400302753e20591-90",
                "reason": "And so the era of DUNAs begins. \nWe vote FOR this proposal.\n\nCreating a DUNA for Uniswap will help the DAO achieve what it could not before, due to the legal impossibilities of an unincorporated organization. In addition, it provides more legal security for participants in governance, .\n\nWe hope that, with DUNA, Uniswap DAO will not only improve legal and operational issues, but also others related to the evolution of the organization and the protocol.",
                "weight": 1066907643290773200000
            },
            {
                "choice": "FOR",
                "id": "0x21b3b193b71680e2fafe40768c03a0fd305efa75-90",
                "reason": null,
                "weight": 1033889903046935400000
            },
            {
                "choice": "FOR",
                "id": "0x21ff9d23e14f3ec0cfc90fa624ef224418fcc5a8-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x22cbb449d40b2e361c63abf4deb6a561430dbe2f-90",
                "reason": null,
                "weight": 33691513700000000000
            },
            {
                "choice": "FOR",
                "id": "0x26d8c3a25eb504eb24454f3cfd67d951431b755a-90",
                "reason": null,
                "weight": 94837980381266360000
            },
            {
                "choice": "FOR",
                "id": "0x2acbe7e4ed2a5f3fcee6960305381934e84ed03b-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x2f2f665974261c4129b1dc6c359bd259cd66f78a-90",
                "reason": null,
                "weight": 9686927431290747000
            },
            {
                "choice": "FOR",
                "id": "0x30620715bcf265773b2973eff4293cee0bb1b774-90",
                "reason": null,
                "weight": 2200823031166854000
            },
            {
                "choice": "FOR",
                "id": "0x30f4337abe6f70890f4ac7ff77016d4b8edb42a6-90",
                "reason": null,
                "weight": 573350144700000000
            },
            {
                "choice": "FOR",
                "id": "0x363c2314d11fc1f983106a16c7307b0c5462af59-90",
                "reason": null,
                "weight": 1009630297867774300000
            },
            {
                "choice": "FOR",
                "id": "0x37b463feae69d547f7d9cc3ff4bcb309928bd54d-90",
                "reason": null,
                "weight": 6076568903573244000
            },
            {
                "choice": "FOR",
                "id": "0x3821bc775f4a3f52fe34adf24b0f96d45c730bf0-90",
                "reason": null,
                "weight": 21491631689807460
            },
            {
                "choice": "FOR",
                "id": "0x38dcfa6b1263c33fbbc2bafd4882a7dd5027472d-90",
                "reason": null,
                "weight": 169331847913512600
            },
            {
                "choice": "FOR",
                "id": "0x3a2b576ef1884f10c4b18c06d55e7c07fde4ec12-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3b3d96d7ba6d981ed0861e54d6298947b495f68f-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3b8843bdb60580f4d8d90fca9727466638b03580-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3ddc7d25c7a1dc381443e491bbf1caa8928a05b0-90",
                "reason": null,
                "weight": 1078828335558698100000
            },
            {
                "choice": "FOR",
                "id": "0x3e511c122d67213c3b3166ddd78d8625d03b2d8c-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a-90",
                "reason": null,
                "weight": 2503688903582531000000000
            },
            {
                "choice": "FOR",
                "id": "0x418735fab2b5631355b8d136793bac69f400bc06-90",
                "reason": null,
                "weight": 5705965356345037000
            },
            {
                "choice": "FOR",
                "id": "0x458ceec48586a85fcfeb4a179706656ee321730e-90",
                "reason": null,
                "weight": 4552145841679252300000
            },
            {
                "choice": "FOR",
                "id": "0x465c63680f2a0b4277d9b4cecc3f3310e531a77f-90",
                "reason": null,
                "weight": 1132476476049441400
            },
            {
                "choice": "FOR",
                "id": "0x475e41b482afc82bae8025d09d128f30b680e10c-90",
                "reason": null,
                "weight": 4637206733087450
            },
            {
                "choice": "FOR",
                "id": "0x477e89659cd4433dcb9cb8a9c607b73413a3238b-90",
                "reason": null,
                "weight": 10973334766172532
            },
            {
                "choice": "FOR",
                "id": "0x490539f53dd0344287b8c8fd85d0ecb8eef44dd0-90",
                "reason": null,
                "weight": 1499999900000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4c0a73b2bc7595c99986c39a39bc92fc720af95e-90",
                "reason": null,
                "weight": 77651522729397780
            },
            {
                "choice": "FOR",
                "id": "0x4d12a4aad451c3209ed3a660e463ba71fef37d7c-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d32d90d6535bd4e7eabaa27ee72932cb214bbfa-90",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d4ac65513fee380c596ac9edfac588782831bdf-90",
                "reason": null,
                "weight": 727970815777275800
            },
            {
                "choice": "FOR",
                "id": "0x4d9ba778b7f121e58e5d3bb6aef514e035a7c7f5-90",
                "reason": null,
                "weight": 1134628983244555800
            },
            {
                "choice": "FOR",
                "id": "0x4dd7fc3a3b6457d1e67e3b046b2b0d2dcf25257d-90",
                "reason": null,
                "weight": 4958652039703373000
            },
            {
                "choice": "FOR",
                "id": "0x4fc88b308723e5ff08003d696aed714768b359fa-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x53da33f96ecffe1cdf3842883c9ba3ba3b49c14b-90",
                "reason": null,
                "weight": 1053782288398953100
            },
            {
                "choice": "FOR",
                "id": "0x553f674dd7d102ad79c644103974a1cc53b62ac2-90",
                "reason": null,
                "weight": 5010440953525458000000000
            },
            {
                "choice": "FOR",
                "id": "0x5762f3074605df17aebe3f5bc8fc7f8702aca752-90",
                "reason": "Participating in governance shouldn't expose individuals to personal legal risk. Adopting a DUNA is a crucial and responsible step to provide a legal shield for all delegates and voters, making the ecosystem safer and more attractive for long-term, high-quality contributors.",
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x5769b60588a7c0e9ba18f1f7d31b0190158a65d9-90",
                "reason": null,
                "weight": 5519279479258599000
            },
            {
                "choice": "FOR",
                "id": "0x5a4b09693ccaa2c3218592d0bafa7788a01f4600-90",
                "reason": null,
                "weight": 2261706270942677800
            },
            {
                "choice": "FOR",
                "id": "0x5bb73e04b810527b14b87c37eff3d62481f2d416-90",
                "reason": null,
                "weight": 939364943184568000000
            },
            {
                "choice": "FOR",
                "id": "0x5c04e7808455ee0e22c2773328c151d0dd79dc62-90",
                "reason": null,
                "weight": 2270288536345699500000000
            },
            {
                "choice": "FOR",
                "id": "0x5e0a1b359754ecdae800c28b5167f36012bed9ef-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5e60b0140f8d37b1b1ea09c9cd8fe2f1f44d5d4c-90",
                "reason": null,
                "weight": 2983367257011890000
            },
            {
                "choice": "FOR",
                "id": "0x621113d749971d2423df66d6fb02f9c45d6aa6a7-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x66aa8bee5366b6b48811ae0dac9fe5e1eefe1621-90",
                "reason": null,
                "weight": 2500247840838060300000000
            },
            {
                "choice": "FOR",
                "id": "0x683a4f9915d6216f73d6df50151725036bd26c02-90",
                "reason": null,
                "weight": 5253359960496503000000000
            },
            {
                "choice": "FOR",
                "id": "0x6de8448e7d5f58af394cc9540abe703d0c955dfd-90",
                "reason": "You can find our full rationale here: https://gov.uniswap.org/t/proxy-prev-boardroom-delegate-platform/25385/22",
                "weight": 1204605350580866300000
            },
            {
                "choice": "FOR",
                "id": "0x6e4aaf7ab038512ee29989b3d1fc6ad8efc36f17-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x6f9bb7e454f5b3eb2310343f0e99269dc2bb8a1d-90",
                "reason": null,
                "weight": 4003772567167137500000
            },
            {
                "choice": "FOR",
                "id": "0x71565a8f2eb4ec38f9e9b716a9aa734431c96d7f-90",
                "reason": null,
                "weight": 12639925388839391000000
            },
            {
                "choice": "FOR",
                "id": "0x72b4b2553b2a6c17b558e628ff5b6b7141a68658-90",
                "reason": null,
                "weight": 10762956274627004
            },
            {
                "choice": "FOR",
                "id": "0x768e4afbb8e8a8252aca1d35b6b2537e3df3caa4-90",
                "reason": null,
                "weight": 1002335369085796400
            },
            {
                "choice": "FOR",
                "id": "0x7a04bd08fc016eaf2fa2090bf52ddc26012517a8-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x7bb9dccc97052ddef05141897fe8313fd4ad0418-90",
                "reason": null,
                "weight": 26849820586372980000
            },
            {
                "choice": "FOR",
                "id": "0x7f21b3e952ae82d10f66e03a9b39d198728a31e0-90",
                "reason": null,
                "weight": 411704160510895550
            },
            {
                "choice": "FOR",
                "id": "0x8108bf9834b26e6272823437324caeaab8aae99d-90",
                "reason": null,
                "weight": 1652537757465360000
            },
            {
                "choice": "FOR",
                "id": "0x832b86bd16da1657ba67c5e6982cfbaf4339b8aa-90",
                "reason": null,
                "weight": 220000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x85bcfa5098aaf506d9590dca8de3cff68a2e6ea3-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8787fc2de4de95c53e5e3a4e5459247d9773ea52-90",
                "reason": null,
                "weight": 474810743922505400000000
            },
            {
                "choice": "FOR",
                "id": "0x88f659b4b6d5614b991c6404b34f821e10390ec0-90",
                "reason": null,
                "weight": 1049470354152832600
            },
            {
                "choice": "FOR",
                "id": "0x8bb9d5908cdce82915a847fbb34fd93e1e50ccc2-90",
                "reason": null,
                "weight": 1330000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x8d07d225a769b7af3a923481e1fdf49180e6a265-90",
                "reason": null,
                "weight": 3301841608581902500000000
            },
            {
                "choice": "FOR",
                "id": "0x8d59b9fc743cb2d80b47ad8bc0571432b45c68d2-90",
                "reason": null,
                "weight": 1011946059317999600
            },
            {
                "choice": "FOR",
                "id": "0x9086f3cc1c4977819254c08de615959c112931fc-90",
                "reason": null,
                "weight": 101975209598870370
            },
            {
                "choice": "FOR",
                "id": "0x9588b068b14e6397bb47ad3763f9fb5e2f7d7cae-90",
                "reason": null,
                "weight": 5432519924210020000
            },
            {
                "choice": "FOR",
                "id": "0x95d2538129c1fac1afebc5c765a406e5f28888f9-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x95f85372846ca6903dc945de6aa236550abb19c0-90",
                "reason": null,
                "weight": 420000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x995d3e45a5c1e0208f68b3e37723dd16b45e34db-90",
                "reason": null,
                "weight": 80681379008400350
            },
            {
                "choice": "FOR",
                "id": "0xa0b24061fe57d2cf4bef61d3c9903c5f82bdad1b-90",
                "reason": null,
                "weight": 28312458676246330000000
            },
            {
                "choice": "FOR",
                "id": "0xa0d0d863ceaa8c65e579b75474c46dddc8e4604a-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xa280bf4efcf1d68594c600bd1104678d577d0cf8-90",
                "reason": null,
                "weight": 200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa62db7185896111d0fa25c89124a41bfdfb047d9-90",
                "reason": null,
                "weight": 10443219240490433000
            },
            {
                "choice": "FOR",
                "id": "0xa6ac718a9bc4f265f6e1297168e55d05d3722bf3-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa6e8772af29b29b9202a073f8e36f447689beef6-90",
                "reason": null,
                "weight": 50844361091245690000000
            },
            {
                "choice": "FOR",
                "id": "0xa8293dd8eb52564a35b8357a539146321b934153-90",
                "reason": null,
                "weight": 55285714880412120000
            },
            {
                "choice": "FOR",
                "id": "0xa8e17be2b11e744561859c9c31ea060ee30bf37c-90",
                "reason": null,
                "weight": 1014229838868808200
            },
            {
                "choice": "FOR",
                "id": "0xaa30037cdd4aa927a3b4df9065e662ebd73a2f53-90",
                "reason": null,
                "weight": 3434587510437592000
            },
            {
                "choice": "FOR",
                "id": "0xaa938607232836de144ceb0e33ccc926bc0c0b96-90",
                "reason": null,
                "weight": 100000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xaac35d953ef23ae2e61a866ab93dea6ec0050bcd-90",
                "reason": null,
                "weight": 408768061954440700000000
            },
            {
                "choice": "FOR",
                "id": "0xacc94d70faf5539197307bc6e01907e60d760b28-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xadd2f9a2c8b74cfb1b8e8fd563531a46b86a8995-90",
                "reason": null,
                "weight": 1204679061844809500
            },
            {
                "choice": "FOR",
                "id": "0xaf05b88ac16ad3272d7ade699db51d03c4ff9f91-90",
                "reason": null,
                "weight": 18882697840930816
            },
            {
                "choice": "FOR",
                "id": "0xb35659cbac913d5e4119f2af47fd490a45e2c826-90",
                "reason": "The Event Horizon Community voted FOR on this Proposal (ehUNI-67): EventHorizon.vote/vote/uniswap/ehUNI-67",
                "weight": 9218871607514396000000
            },
            {
                "choice": "FOR",
                "id": "0xb49f8b8613be240213c1827e2e576044ffec7948-90",
                "reason": null,
                "weight": 1609932839262387400000
            },
            {
                "choice": "FOR",
                "id": "0xb55a948763e0d386b6defcd8070a522216ae42b1-90",
                "reason": null,
                "weight": 4555503435212228000000000
            },
            {
                "choice": "FOR",
                "id": "0xb79294d00848a3a4c00c22d9367f19b4280689d7-90",
                "reason": null,
                "weight": 73133213475906255000000
            },
            {
                "choice": "FOR",
                "id": "0xb8542377534c1075a9bb535acbff6dd560a32799-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb933aee47c438f22de0747d57fc239fe37878dd1-90",
                "reason": null,
                "weight": 2515617579018067400000000
            },
            {
                "choice": "AGAINST",
                "id": "0xbe6e0481e9fce3145977da0fa41d10269138d2a6-90",
                "reason": null,
                "weight": 11215451923729600
            },
            {
                "choice": "FOR",
                "id": "0xbec643bd5b7f5e9190617ca4187ef0455950c51c-90",
                "reason": null,
                "weight": 5000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xbef8f29e284b14817cf6e6a4e29fc93360ac9999-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xbfd768bd735d6726a86cb21de53f7fbe5b6fe5ef-90",
                "reason": null,
                "weight": 75107068345895650
            },
            {
                "choice": "FOR",
                "id": "0xc2cb4442a5e7046ac28fad475feced67eec7f660-90",
                "reason": null,
                "weight": 1300000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc31047a053e1a9c1ba548792c9f3b6f619428986-90",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc3a2821727e9e5fa690f8c69c5d8e0899aa0e6ee-90",
                "reason": null,
                "weight": 8554287073301785
            },
            {
                "choice": "FOR",
                "id": "0xc3ee6ddf545e31c68c9a6299098b51fe4db52cd6-90",
                "reason": null,
                "weight": 89256435683880000000000
            },
            {
                "choice": "FOR",
                "id": "0xc4cd22191f27d2cbcab7ba7be07b3655688147bc-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc5547b4907418c2ec0c2a95bec6fee8354657759-90",
                "reason": "Participating in governance shouldn't expose individuals to personal legal risk. Adopting a DUNA is a crucial and responsible step to provide a legal shield for all delegates and voters, making the ecosystem safer and more attractive for long-term, high-quality contributors.",
                "weight": 2684200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc85032a2e77be215a095fc8b77c0e3e16bb69bf9-90",
                "reason": null,
                "weight": 138137818737413980
            },
            {
                "choice": "FOR",
                "id": "0xc8597d79bce0a06393832ae98033c5bb2aa2d529-90",
                "reason": null,
                "weight": 11041566885303806000
            },
            {
                "choice": "FOR",
                "id": "0xc9ff715ff5fde21a10c8054085a756ce098fe896-90",
                "reason": null,
                "weight": 457991380066129200
            },
            {
                "choice": "FOR",
                "id": "0xcb70d1b61919dae81f5ca620f1e5d37b2241e638-90",
                "reason": null,
                "weight": 7000000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xccc3ead1a68e2d65eb88cc7064f78faea1a3f451-90",
                "reason": null,
                "weight": 2570719474710917000
            },
            {
                "choice": "FOR",
                "id": "0xccfcdf6fb169c7dc94dc2b1880271b99c16544a2-90",
                "reason": null,
                "weight": 207214596109569730
            },
            {
                "choice": "FOR",
                "id": "0xd248a27d2bbacb0ff7d8d92d48a62d6a090832ae-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xd6368d2e97695a30678e5ec2668f23c05320522e-90",
                "reason": null,
                "weight": 12817244572586912
            },
            {
                "choice": "FOR",
                "id": "0xd67cb3bdcc300f10dd25fb62dadb8c9242f0d5b7-90",
                "reason": null,
                "weight": 5383032009988122000
            },
            {
                "choice": "FOR",
                "id": "0xd6b8d0e159b29074a5df734e590c9010a0069b80-90",
                "reason": null,
                "weight": 1000082394466016300
            },
            {
                "choice": "FOR",
                "id": "0xd71230207b61d8a72021b9fb509e469dc5ba1366-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xd8dea87ddcc0c3c1464ded6102e4d3e829d0ae41-90",
                "reason": null,
                "weight": 1159173663882110500
            },
            {
                "choice": "FOR",
                "id": "0xe18c849a113b15685858e5cd96096f902fd7d46b-90",
                "reason": null,
                "weight": 5470425155854999000
            },
            {
                "choice": "FOR",
                "id": "0xe22817a91a14d61cb3691954983663425f5513b1-90",
                "reason": null,
                "weight": 108326980206522610000
            },
            {
                "choice": "FOR",
                "id": "0xe6b84dad5d26de2712d0c524dab35610e71b452d-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xe8eeeada50b535f415d630791f330dabf3870877-90",
                "reason": null,
                "weight": 120609834265912580
            },
            {
                "choice": "FOR",
                "id": "0xe93d59cc0bcecfd4ac204827ef67c5266079e2b5-90",
                "reason": null,
                "weight": 2502813846044307000000000
            },
            {
                "choice": "FOR",
                "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9-90",
                "reason": null,
                "weight": 2504981137130972700000000
            },
            {
                "choice": "FOR",
                "id": "0xed2a92b65b1a489db637a0cd9f2a4bb80367aeaf-90",
                "reason": "I'm excited to support the DUNI, it's a milestone in the evolution of DAO's and critical for Uniswaps future. It also serves to signal as my membership in the DUNI and be eligible for all the benefits that come with that!",
                "weight": 250000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xed4ca23fe53a936f3b74906b731f730dfd269508-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xee2acdcd6c9d46e216ccaab94899f26234d258a7-90",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf070cd4b5ba73a6b6a939dde513f79862bffcd25-90",
                "reason": null,
                "weight": 14942500000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf4b0556b9b6f53e00a1fdd2b0478ce841991d8fa-90",
                "reason": null,
                "weight": 22462171997328257000
            },
            {
                "choice": "FOR",
                "id": "0xf51754d95c0b9bb416ab4915e9f10b04d04d29e5-90",
                "reason": null,
                "weight": 10171189839135048000
            },
            {
                "choice": "FOR",
                "id": "0xf7d51c13d9a7cdc902e57bde1b42f58c08921b3c-90",
                "reason": null,
                "weight": 69396655990286950
            },
            {
                "choice": "FOR",
                "id": "0xf9551c66995ed3ff9bb05c9fd7ff148bd75dc99a-90",
                "reason": null,
                "weight": 249999939598150700000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0xfd97496cf4f8102b7df15bf325aec6bfb2a2e7ce-90",
                "reason": null,
                "weight": 77691169629971570
            },
            {
                "choice": "FOR",
                "id": "0xfffd05ae9db4d5f4e23e2f37395db2f87359bf5d-90",
                "reason": null,
                "weight": 8185069416993695000
            }
        ]
    },
    {
        "abstain_delegate_votes": null,
        "against_delegate_votes": null,
        "creation_time": null,
        "description": "# Scaling V4 and Supporting Unichain\nPGOV is submitting the proposal on GFX Labs' behalf because GFX no longer has sufficient voting power to submit.\n\n\nGFX Labs proposes that the Uniswap DAO allocate funding to support the integration of Uniswap V4 on Ethereum in Oku, and to add support for Unichain on Oku. This initiative aims to enhance Uniswap's reach, encourage liquidity migration to V4, and solidify the protocol’s position as the leading decentralized exchange.\n\n## Updates\n\n* We have **removed** the Additional Use Grant language. The rest of the proposal remains the same.\n\n### Background\n\nIn 2022, GFX Labs was granted $1.6M from the Uniswap DAO to scale the Uniswap ecosystem and expand the protocol's presence across EVM chains. Today, Oku is live across 30+ chains, and we have expanded our services to offer best-in-class bridge and trade aggregation. With a dedicated interface for V3 pool analytics and a simplified LP management interface, Oku has served as a consistent and scalable growth channel for the wider Uniswap ecosystem.\n\nWe’ve deployed to a wide range of chains at our own expense – far exceeding the original scope of the grant – and have generated a high ROI by accelerating Uniswap adoption across new environments. Now, with the advent of Uniswap V4, it’s time to build the next generation of tooling for the next wave of liquidity.\n\n### Scale V4 and Add Unichain Support\n\nSince the launch of Uniswap V4 in January 2025, we’ve seen a surge in interest from users, partners, and hook developers eager to experiment with the new protocol’s capabilities. As one of the most active contributors to the Uniswap ecosystem infrastructure, GFX Labs views this momentum as a timely opportunity to scale V4 usage, reduce friction for LP’ing, and host an environment for hook developers to showcase their innovative pool adaptations. As we have provided for V3, GFX Labs will develop a dedicated V4 analytics interface to support hooked pool discovery and performance tracking.\n\n### Who benefits?\n\nThe Uniswap DAO’s ability to expand V4’s reach heavily depends on ecosystem builders and infrastructure. That is why supporting the flywheel between hook builders, liquidity migrators/providers, and traders is crucial. With V4’s flexibility also comes complexity. It is key that each stakeholder's user experience and needs are addressed and iterated upon so V4 can become the dominant DEX protocol. Oku will fill the gaps and support ecosystem players as a base layer user interface for developers, LPs, traders, and chains. EVM chains with V4 enabled will have separate interfaces to distinguish between hooked and vanilla pools.\n\n**Hook Devs**: Hook developers thrive when LP’ing is made easy, unlocking exposure to their unique market architecture\n\n**LPs**: Intuitive position management tools and highlighted yield farming opportunities for V4 pools\n\n**Traders**: Option to include V4 “hooked” pools for unique trading strategies & best execution\n\n**DAO**: Expand V4 footprint across all chains and highlight market opportunities for unique market structures\n\n### Proposed Plan\n\nV4 Development Scope\n\n* V4 Liquidity management\n* Pool analytics with historical performance data\n* Oku V4 data API for anyone building in the Uniswap ecosystem\n* Hook pool discovery via V4 analytics dashboard\n* Routing support for V4 traders\n\nFor the one-time integration and build-out of V4 on Ethereum Mainnet into Oku, we are requesting a total of $250K. The Uniswap DAO could expect delivery within two months of the proposal passing. Post launch, Oku will continue to improve the V4 interface and iterate based on feedback.\n\n* Backend infrastructure: $150,000. This would primarily focus on indexing the V4 protocol, adding a routing setup for V4 markets, and updating our peripheral systems to support V4.\n* Frontend development: $100,000. There are two phases here. The first would be designing new UI elements for pool creation, V4 LPing, V4 analytics, V4 trading, and any other UI updates necessary to support V3 and V4 in the same interface. The second phase is implementing the design improvements.\n\n### Unichain Deployment on Oku\n\n* Within two weeks of this proposal passing, Unichain and the **V3 deployment** will be available in Oku. Unichain users will have access to a full suite of Oku features, including a smart routing system integrated into 10 trade routers and 11 bridges.\n* As soon as we have the minimum viable backend and frontend support for V4, we will integrate the Unichain V4 deployment.\n\nGiven our long-standing relationship with the DAO and our concurrent request for the initial V4 integration, GFX Labs will waive the standard integration fee for integrating Unichain with Oku. Recognizing the benefit of a synergistic V3/V4 offering, instead we are requesting $90k - $7.5k per month - to cover operational and maintenance related costs. This cost structure is representative of preferential pricing for the Uniswap DAO.\n\nWith a new emphasis on V4 infrastructure, Oku further aligns itself as a standard bearer for the Uniswap ecosystem, with a focus on expanding utility and interoperability across EVM environments. By funding this proposal, the DAO positions itself to scale V4 usage, promote novel onchain markets, and support unique market innovation from the ground up.",
        "for_delegate_votes": null,
        "id": "89",
        "proposer": {
            "delegated_votes_raw": null,
            "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a",
            "number_votes": null,
            "token_holders_represented_amount": null
        },
        "quorum_votes": null,
        "state": "EXECUTED",
        "total_delegate_votes": null,
        "votes": [
            {
                "choice": "FOR",
                "id": "0x0057be07beef5d9b4beb9e2d147906e83d1915c8-89",
                "reason": null,
                "weight": 1573151803047202800
            },
            {
                "choice": "FOR",
                "id": "0x0100e22f222753f6021abeb3f7e4af4c57467cc9-89",
                "reason": null,
                "weight": 4707658469842507000
            },
            {
                "choice": "FOR",
                "id": "0x015122a625b45f68e6d795c0ab99fc7107e4c3b9-89",
                "reason": null,
                "weight": 4360000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x01de6487b3888e599f8145a7eca94da74837071c-89",
                "reason": null,
                "weight": 1120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x0579a616689f7ed748dc07692a3f150d44b0ca09-89",
                "reason": null,
                "weight": 101476005146459770000
            },
            {
                "choice": "FOR",
                "id": "0x05d84c3f01dbf8c3085e4b2fe5bc73c94c1b8e41-89",
                "reason": null,
                "weight": 8015664277551202000
            },
            {
                "choice": "FOR",
                "id": "0x06c4865ab16c9c760622f19a313a2e637e2e66a2-89",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x070341aa5ed571f0fb2c4a5641409b1a46b4961b-89",
                "reason": "FranklinDAO voted against due to lack of accountability measures. We need quarterly public usage metrics, governance abstention on own proposals, and outcome-based deliverables focused on incremental activity. Open to reconsidering with proper transparency. Full reasoning here: https://gov.uniswap.org/t/scaling-v4-and-supporting-unichain/25484/51",
                "weight": 3001101430465253000000000
            },
            {
                "choice": "FOR",
                "id": "0x08da921576bf0417cb7d29115571db53d177e837-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x0940e77c7a784c65a9726b7a4e6852c7e05276cc-89",
                "reason": null,
                "weight": 2209237684148285700
            },
            {
                "choice": "AGAINST",
                "id": "0x0a0f04a231efbc29e1db7d086300ff550211c2f6-89",
                "reason": "Where fee switch? Fee switch now pls.",
                "weight": 46241847731945810000000
            },
            {
                "choice": "FOR",
                "id": "0x0de74ef8a6d719c544019e253afdafcfb7d23db3-89",
                "reason": null,
                "weight": 231411299715943800
            },
            {
                "choice": "FOR",
                "id": "0x0e4cb981aa087847ef0c9f0c0989d884a86d04c3-89",
                "reason": null,
                "weight": 4499367621546917000
            },
            {
                "choice": "FOR",
                "id": "0x0e9951bd0c3625f4a7b019e455c8090834c6a3af-89",
                "reason": null,
                "weight": 13142728991918232000
            },
            {
                "choice": "FOR",
                "id": "0x11069c08dd30aa4c17d73b0e3984a433a0e39fda-89",
                "reason": null,
                "weight": 402925517216111460000
            },
            {
                "choice": "AGAINST",
                "id": "0x11cef2922019c399288a4669d147bf1ce54cf3c7-89",
                "reason": null,
                "weight": 1713799249654378000
            },
            {
                "choice": "FOR",
                "id": "0x12b30979b9a53bb0b42deaaa974ac9304fab0832-89",
                "reason": null,
                "weight": 2576571094910000000000
            },
            {
                "choice": "FOR",
                "id": "0x134d35266e9075adc311182938f5f9083df6b65c-89",
                "reason": null,
                "weight": 194623777299749500
            },
            {
                "choice": "FOR",
                "id": "0x13bdae8c5f0fc40231f0e6a4ad70196f59138548-89",
                "reason": null,
                "weight": 3862025126518114000000000
            },
            {
                "choice": "FOR",
                "id": "0x168620f57dcbcd5d9ac84e5ca3c2ec753bd60c88-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x168f87fbfe36b84e44b9d06278b2aa1cc73d7400-89",
                "reason": null,
                "weight": 5790702000000000000
            },
            {
                "choice": "FOR",
                "id": "0x17296956b4e07ff8931e4ff4ea06709fab70b879-89",
                "reason": null,
                "weight": 7001000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1855f41b8a86e701e33199de7c25d3e3830698ba-89",
                "reason": null,
                "weight": 504601692054391850000000
            },
            {
                "choice": "FOR",
                "id": "0x1a1e1cfb35a3c51e424710220b4b418de419516c-89",
                "reason": null,
                "weight": 6730816894574673000
            },
            {
                "choice": "FOR",
                "id": "0x1a9ab967c5672622c55023ea2fcb892e60da2e4a-89",
                "reason": null,
                "weight": 3742226664652157000
            },
            {
                "choice": "FOR",
                "id": "0x1b686ee8e31c5959d9f5bbd8122a58682788eead-89",
                "reason": null,
                "weight": 259558859640355130000000
            },
            {
                "choice": "FOR",
                "id": "0x1c699213c8de5ae85f95b8282dbdf2e50ed37911-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x1de95917e3fdca7255abc01c7c85fa606a0c2f0d-89",
                "reason": null,
                "weight": 10960146254367330000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x1e4942b1a4fab51ec950e5cccc957497b37d1103-89",
                "reason": null,
                "weight": 200000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1f3d3a7a9c548be39539b39d7400302753e20591-89",
                "reason": null,
                "weight": 1000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x21b3b193b71680e2fafe40768c03a0fd305efa75-89",
                "reason": null,
                "weight": 29000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x224b41dd9adf5697a2a18cba6ed5c95b29179a1a-89",
                "reason": null,
                "weight": 5474744628373988000
            },
            {
                "choice": "AGAINST",
                "id": "0x237f2afa0372f590b9bcf87db64db50043da3322-89",
                "reason": null,
                "weight": 200000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x23b49258deadf74aa59157b3559621d638d04ac7-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x23c4111d6f85de542dd8ad911c7c3cc66e98faa7-89",
                "reason": null,
                "weight": 2000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x23d0048a80302667647fd4e67fa46c77d936d9cd-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "ABSTAIN",
                "id": "0x2472efeb5f15fcb7f052766c3ad0f2c3f171eccf-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x26d8c3a25eb504eb24454f3cfd67d951431b755a-89",
                "reason": null,
                "weight": 94837980381266360000
            },
            {
                "choice": "FOR",
                "id": "0x29f68d986e07509f26ce22c03b2ce0a7024bd595-89",
                "reason": null,
                "weight": 5070448752563842000
            },
            {
                "choice": "FOR",
                "id": "0x2a902eaee80fe764f420c6ba9a3ffe599b6d78a2-89",
                "reason": null,
                "weight": 140003214897878110
            },
            {
                "choice": "FOR",
                "id": "0x2aa55cb56c454c432b912bb19bc21d54ce4ff742-89",
                "reason": null,
                "weight": 13289661071231597000
            },
            {
                "choice": "FOR",
                "id": "0x2f2f665974261c4129b1dc6c359bd259cd66f78a-89",
                "reason": null,
                "weight": 9670884724790321000
            },
            {
                "choice": "FOR",
                "id": "0x30f4337abe6f70890f4ac7ff77016d4b8edb42a6-89",
                "reason": null,
                "weight": 573350144700000000
            },
            {
                "choice": "FOR",
                "id": "0x32faeb79584659de53d1b165d00f11f3b4e44c93-89",
                "reason": "voting FOR this proposal to accelerate Uniswap V4 adoption and drive ecosystem growth.",
                "weight": 1185549793881505100000
            },
            {
                "choice": "FOR",
                "id": "0x343661eed86405a609dd051b3a3720da385f22cc-89",
                "reason": null,
                "weight": 12516898396271962000
            },
            {
                "choice": "FOR",
                "id": "0x34a813d4753ad2d6d40b92c01623087954c00f91-89",
                "reason": null,
                "weight": 5133894442761615000
            },
            {
                "choice": "FOR",
                "id": "0x37b463feae69d547f7d9cc3ff4bcb309928bd54d-89",
                "reason": null,
                "weight": 3977381618159529500
            },
            {
                "choice": "AGAINST",
                "id": "0x3821bc775f4a3f52fe34adf24b0f96d45c730bf0-89",
                "reason": null,
                "weight": 21491631689807460
            },
            {
                "choice": "AGAINST",
                "id": "0x3b3d96d7ba6d981ed0861e54d6298947b495f68f-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3ddc7d25c7a1dc381443e491bbf1caa8928a05b0-89",
                "reason": null,
                "weight": 1076870215514875900000
            },
            {
                "choice": "FOR",
                "id": "0x3faa332d536cc32adc61897401a09ff2d78b742a-89",
                "reason": null,
                "weight": 11052741498628530000
            },
            {
                "choice": "FOR",
                "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a-89",
                "reason": null,
                "weight": 2501668921804423000000000
            },
            {
                "choice": "FOR",
                "id": "0x40534e513df8277870b81e97b5107b3f39de4f15-89",
                "reason": null,
                "weight": 250000058054548800000
            },
            {
                "choice": "FOR",
                "id": "0x456e6bc1bdf1030edcb9d6f911aceaa83b8c4376-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x477e89659cd4433dcb9cb8a9c607b73413a3238b-89",
                "reason": null,
                "weight": 10973334766172532
            },
            {
                "choice": "FOR",
                "id": "0x48c457867ddefe44737307367f651ac9c0792048-89",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x49a455aa41b736f12582f8112a99140ac9249023-89",
                "reason": null,
                "weight": 134546793902125920
            },
            {
                "choice": "FOR",
                "id": "0x49fb3ff6e3aa5eb91aa85cc674c8990b263263ae-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x4d32d90d6535bd4e7eabaa27ee72932cb214bbfa-89",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x4d4ac65513fee380c596ac9edfac588782831bdf-89",
                "reason": null,
                "weight": 650940985355456900
            },
            {
                "choice": "FOR",
                "id": "0x4d9ba778b7f121e58e5d3bb6aef514e035a7c7f5-89",
                "reason": null,
                "weight": 1134628983244555800
            },
            {
                "choice": "FOR",
                "id": "0x4db656e69224f1405abfc642a5a7604e0fc9644b-89",
                "reason": null,
                "weight": 13137887449595806000
            },
            {
                "choice": "FOR",
                "id": "0x4dd7fc3a3b6457d1e67e3b046b2b0d2dcf25257d-89",
                "reason": null,
                "weight": 3742093716218786000
            },
            {
                "choice": "FOR",
                "id": "0x4e773359d475735a029a7cebdcf072ca85ffcf92-89",
                "reason": null,
                "weight": 11908703437997042000
            },
            {
                "choice": "AGAINST",
                "id": "0x4fc53cdfb93fa69058529aa2caa174581e7fb541-89",
                "reason": null,
                "weight": 1111950387064342400
            },
            {
                "choice": "FOR",
                "id": "0x508a4f07b60ba0940283cd4e32d5deb0cc38adf7-89",
                "reason": null,
                "weight": 2515506674338619400
            },
            {
                "choice": "FOR",
                "id": "0x53d6cd1009b773e71698eae30c7d77927aa88bd1-89",
                "reason": null,
                "weight": 12525867218855680000
            },
            {
                "choice": "FOR",
                "id": "0x53da33f96ecffe1cdf3842883c9ba3ba3b49c14b-89",
                "reason": null,
                "weight": 652701030988289200
            },
            {
                "choice": "FOR",
                "id": "0x553f674dd7d102ad79c644103974a1cc53b62ac2-89",
                "reason": null,
                "weight": 5010542683239969000000000
            },
            {
                "choice": "FOR",
                "id": "0x59004ebd321ddeaf7e22f3f046798d6d35888e62-89",
                "reason": null,
                "weight": 11447675876126177000
            },
            {
                "choice": "FOR",
                "id": "0x5a4b09693ccaa2c3218592d0bafa7788a01f4600-89",
                "reason": null,
                "weight": 22261706270942680000
            },
            {
                "choice": "FOR",
                "id": "0x5c04e7808455ee0e22c2773328c151d0dd79dc62-89",
                "reason": null,
                "weight": 20288536345699600000000
            },
            {
                "choice": "FOR",
                "id": "0x61ff9cbe2d6ce98f4c8ecf3807339474f4c09630-89",
                "reason": null,
                "weight": 1110000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x6367af8e19e6b00f26e62f30229c5a764caa48d6-89",
                "reason": null,
                "weight": 40000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x638155988c8077d3340e63b122f6e05c219acdae-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x66aa8bee5366b6b48811ae0dac9fe5e1eefe1621-89",
                "reason": null,
                "weight": 2500247840838060300000000
            },
            {
                "choice": "FOR",
                "id": "0x66b190d7efe49fc082e8872a9c8ace703dc80588-89",
                "reason": null,
                "weight": 1426822250822221300
            },
            {
                "choice": "FOR",
                "id": "0x6753df3dd40fd96aded3146055773edeff5e09fd-89",
                "reason": null,
                "weight": 4128560487862273000
            },
            {
                "choice": "FOR",
                "id": "0x683a4f9915d6216f73d6df50151725036bd26c02-89",
                "reason": null,
                "weight": 5254178746216513000000000
            },
            {
                "choice": "FOR",
                "id": "0x69f24ee429ca14df1b7006663ce1bb845d4ccac4-89",
                "reason": null,
                "weight": 12072450488566714000
            },
            {
                "choice": "FOR",
                "id": "0x6a87066a1d93feeb2479014dc79e03f31d5721cb-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x6de8448e7d5f58af394cc9540abe703d0c955dfd-89",
                "reason": "You can find our rationale in our delegate thread: https://gov.uniswap.org/t/proxy-prev-boardroom-delegate-platform/25385/15",
                "weight": 4605350580866312000
            },
            {
                "choice": "AGAINST",
                "id": "0x6f9bb7e454f5b3eb2310343f0e99269dc2bb8a1d-89",
                "reason": null,
                "weight": 2999766493207432500000
            },
            {
                "choice": "FOR",
                "id": "0x701bc4f42b47778f2b6b40bf95fe0ee7259a986b-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x72b4b2553b2a6c17b558e628ff5b6b7141a68658-89",
                "reason": null,
                "weight": 10762956274627004
            },
            {
                "choice": "FOR",
                "id": "0x768e4afbb8e8a8252aca1d35b6b2537e3df3caa4-89",
                "reason": null,
                "weight": 1002335369085796400
            },
            {
                "choice": "FOR",
                "id": "0x7ae109a63ff4dc852e063a673b40bed85d22e585-89",
                "reason": null,
                "weight": 1250520060000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x7bb9dccc97052ddef05141897fe8313fd4ad0418-89",
                "reason": null,
                "weight": 16585224809275220000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x80e1a87c37ad8350572245541b9fdf3039155693-89",
                "reason": null,
                "weight": 12512260127015336000
            },
            {
                "choice": "FOR",
                "id": "0x81bcc6a163a5fe2562308e51acb2a5a6d90dea71-89",
                "reason": null,
                "weight": 2200000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x8573e6742f236c842a03c71593f401538228be94-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x86b892c9d4bdb75a69482f79cc17eca55343adab-89",
                "reason": null,
                "weight": 5041373440196904000
            },
            {
                "choice": "FOR",
                "id": "0x8787fc2de4de95c53e5e3a4e5459247d9773ea52-89",
                "reason": null,
                "weight": 461322083093583000000000
            },
            {
                "choice": "FOR",
                "id": "0x89e9c7d0d709cc65d3e70cbf1d8561ded00f4c5b-89",
                "reason": null,
                "weight": 10814544214736898000
            },
            {
                "choice": "FOR",
                "id": "0x8abfdd1563ca17eb9b180ac271f05d5dd035441a-89",
                "reason": null,
                "weight": 4000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x8af2cc382a57ef846c147669e050a3e5a3804cdf-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8b1fd8e2a49b06573c59b6da602d13fb78e31de0-89",
                "reason": null,
                "weight": 14986234430431703000
            },
            {
                "choice": "FOR",
                "id": "0x8bb9d5908cdce82915a847fbb34fd93e1e50ccc2-89",
                "reason": null,
                "weight": 1330000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x8d07d225a769b7af3a923481e1fdf49180e6a265-89",
                "reason": null,
                "weight": 3301845718793864300000000
            },
            {
                "choice": "FOR",
                "id": "0x8d1509e0240eba23cccd58941fa2b5d7ff1fc70f-89",
                "reason": null,
                "weight": 1021196705781063200
            },
            {
                "choice": "FOR",
                "id": "0x8d59b9fc743cb2d80b47ad8bc0571432b45c68d2-89",
                "reason": null,
                "weight": 1011946059317999600
            },
            {
                "choice": "FOR",
                "id": "0x90a997e64bbe3221ee1ebb4e70e2d72c1eac4a7f-89",
                "reason": null,
                "weight": 500000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x9145a391dae8feb36f1d9c606efd0eb4b63e7618-89",
                "reason": null,
                "weight": 6646098522270154000
            },
            {
                "choice": "FOR",
                "id": "0x940fb480f0736245e12ed919ed82af70cfb90f20-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x95328d98630779834f3e46f78f900042bc2bdd15-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x9a0f21b00d45856bf67be52d822fa3d4f8888de8-89",
                "reason": null,
                "weight": 1227444092654563800
            },
            {
                "choice": "FOR",
                "id": "0x9a8394a13acddacf438dd6decb2e79b5148c8488-89",
                "reason": null,
                "weight": 11500000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x9e41b73693c664d81a2ed418dba2193417783054-89",
                "reason": null,
                "weight": 113882684120971200
            },
            {
                "choice": "FOR",
                "id": "0xa23ed0c084b2c84f67d2d80b6fad0345b9f2392d-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0xa280bf4efcf1d68594c600bd1104678d577d0cf8-89",
                "reason": null,
                "weight": 200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa2ed07adc1a25074b67b493af7dfec1514c2d008-89",
                "reason": null,
                "weight": 10025021922760587000
            },
            {
                "choice": "FOR",
                "id": "0xa6e8772af29b29b9202a073f8e36f447689beef6-89",
                "reason": null,
                "weight": 83770058734738180000000
            },
            {
                "choice": "FOR",
                "id": "0xa763333a1abb7f534f3ef6b457b8045392767ef4-89",
                "reason": null,
                "weight": 25065431241585300000
            },
            {
                "choice": "FOR",
                "id": "0xa8293dd8eb52564a35b8357a539146321b934153-89",
                "reason": null,
                "weight": 32941026986416714000
            },
            {
                "choice": "FOR",
                "id": "0xa8e17be2b11e744561859c9c31ea060ee30bf37c-89",
                "reason": null,
                "weight": 1194229838868808200
            },
            {
                "choice": "FOR",
                "id": "0xaa30037cdd4aa927a3b4df9065e662ebd73a2f53-89",
                "reason": null,
                "weight": 3434587510437592000
            },
            {
                "choice": "FOR",
                "id": "0xaac35d953ef23ae2e61a866ab93dea6ec0050bcd-89",
                "reason": null,
                "weight": 406629473350141200000000
            },
            {
                "choice": "FOR",
                "id": "0xaf05b88ac16ad3272d7ade699db51d03c4ff9f91-89",
                "reason": null,
                "weight": 338882697840930800
            },
            {
                "choice": "FOR",
                "id": "0xb12ddbd97aafeeef0c29acd3bbe3cab65b6127d5-89",
                "reason": null,
                "weight": 12358349434717497000
            },
            {
                "choice": "AGAINST",
                "id": "0xb1e87889b4bde8737c561810121bc8a12a36c153-89",
                "reason": null,
                "weight": 260779986350519840000
            },
            {
                "choice": "FOR",
                "id": "0xb1f09afdfd9014c06680b56c71ca45524e8371fb-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb26f0100a404c5e5c3fd35221dd7e5955fd8d6eb-89",
                "reason": null,
                "weight": 5150797207194383000
            },
            {
                "choice": "FOR",
                "id": "0xb35659cbac913d5e4119f2af47fd490a45e2c826-89",
                "reason": "The Event Horizon Community voted FOR on this Proposal (ehUNI-61): EventHorizon.vote/vote/uniswap/ehUNI-61",
                "weight": 9055958715122288000000
            },
            {
                "choice": "FOR",
                "id": "0xb49f8b8613be240213c1827e2e576044ffec7948-89",
                "reason": null,
                "weight": 2500597886507689000000000
            },
            {
                "choice": "FOR",
                "id": "0xb79294d00848a3a4c00c22d9367f19b4280689d7-89",
                "reason": null,
                "weight": 79034485855158000000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0xb83405aaee2a54a08022403939736bf5b33510e1-89",
                "reason": null,
                "weight": 22662122720000000000
            },
            {
                "choice": "FOR",
                "id": "0xb89a171141f7bdd5000c0b5b0f5808edea9e7f37-89",
                "reason": null,
                "weight": 6573891511187078000
            },
            {
                "choice": "FOR",
                "id": "0xb933aee47c438f22de0747d57fc239fe37878dd1-89",
                "reason": null,
                "weight": 2746905460270175000000000
            },
            {
                "choice": "FOR",
                "id": "0xb9c779e67e1a2f7b42eb5b6edb333b7a50858773-89",
                "reason": null,
                "weight": 12511243006927938000
            },
            {
                "choice": "FOR",
                "id": "0xbbf040bc646df1a1c5577df0b098fb9d25304e0d-89",
                "reason": null,
                "weight": 11951282137019533000
            },
            {
                "choice": "FOR",
                "id": "0xbc8c39bac584cf093865abcb195e49909f23ef51-89",
                "reason": null,
                "weight": 11592713073990822000
            },
            {
                "choice": "AGAINST",
                "id": "0xbcd8491890516082cf5746db805da35c64f060cb-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xbec643bd5b7f5e9190617ca4187ef0455950c51c-89",
                "reason": null,
                "weight": 5000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xbecafae450b9f573fcda44141022e1942bb700e7-89",
                "reason": null,
                "weight": 12844597773094033000
            },
            {
                "choice": "FOR",
                "id": "0xc0220349d63349162ef27a9c68cff0e8f8a5fa46-89",
                "reason": null,
                "weight": 11572911622860860000
            },
            {
                "choice": "AGAINST",
                "id": "0xc08314d6e1e1cff0787a51a12f7eeb8ff9921edc-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0xc2a4a819c29fc5a487b9c7f03ea01568cc71badf-89",
                "reason": null,
                "weight": 10488884129532790000
            },
            {
                "choice": "ABSTAIN",
                "id": "0xc5547b4907418c2ec0c2a95bec6fee8354657759-89",
                "reason": "We are abstaining from this proposal due to outstanding concerns regarding transparency, potential conflicts of interest, and misalignment of value capture with the broader Uniswap DAO community. GFX Labs, the team behind Oku, appears to benefit commercially from Uniswap v3 deployments via a subscription-based model, with minimal direct benefit to UNI holders. The request for a v4 license exemption further consolidates this advantage without clear justification for DAO funding or strategic alignment.",
                "weight": 2684200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc6d7208dadee4f431bd0f3f11e7d4c91ff51bfb2-89",
                "reason": null,
                "weight": 1111000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc8f1119bca644bd9b6466cc237054e86905417c2-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd0de248f70107bf6a178b70e34aab3467a7ab16f-89",
                "reason": null,
                "weight": 1152034023389328100
            },
            {
                "choice": "AGAINST",
                "id": "0xd2602c7bdfc9f413974e944280bbfae275d1b1b6-89",
                "reason": null,
                "weight": 1069979970235306100
            },
            {
                "choice": "FOR",
                "id": "0xd66427a092c55e1ee974edfe842d99ddb7f05b95-89",
                "reason": null,
                "weight": 10410507395989774000
            },
            {
                "choice": "FOR",
                "id": "0xd82803b7b9a5eb1d5fc558fd619afc6c031cd0b1-89",
                "reason": null,
                "weight": 1430000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xd8dea87ddcc0c3c1464ded6102e4d3e829d0ae41-89",
                "reason": null,
                "weight": 1657313873315690000
            },
            {
                "choice": "FOR",
                "id": "0xdc1f98682f4f8a5c6d54f345f448437b83f5e432-89",
                "reason": null,
                "weight": 2499999900000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xdeb0db31a30104880be8e9940d3d4d47f4c56976-89",
                "reason": null,
                "weight": 148238917706671200
            },
            {
                "choice": "FOR",
                "id": "0xdef04fb11f17693feae3362b2c1e17989d8456e3-89",
                "reason": null,
                "weight": 3011738000000000000
            },
            {
                "choice": "FOR",
                "id": "0xe22817a91a14d61cb3691954983663425f5513b1-89",
                "reason": null,
                "weight": 187080159105444600000
            },
            {
                "choice": "AGAINST",
                "id": "0xe2740a5b1ce75dbfbd006ff70d29f19002071542-89",
                "reason": null,
                "weight": 127306083511319570
            },
            {
                "choice": "FOR",
                "id": "0xe5bde866b2dd33a2aec4c2ca2dd446a084397091-89",
                "reason": null,
                "weight": 150047389746581860
            },
            {
                "choice": "FOR",
                "id": "0xe93d59cc0bcecfd4ac204827ef67c5266079e2b5-89",
                "reason": null,
                "weight": 2500654176632505000000000
            },
            {
                "choice": "FOR",
                "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9-89",
                "reason": null,
                "weight": 2504481638940697300000000
            },
            {
                "choice": "FOR",
                "id": "0xed11e5ea95a5a3440fbaadc4cc404c56d0a5bb04-89",
                "reason": null,
                "weight": 2500752435632778500000000
            },
            {
                "choice": "AGAINST",
                "id": "0xed4a59031e82296ed0ce0e3e1bf0020a5570150d-89",
                "reason": null,
                "weight": 109387451799105670000
            },
            {
                "choice": "FOR",
                "id": "0xee400d0fe9ade577518307461910ab1a2f570de3-89",
                "reason": null,
                "weight": 11904724615745915000
            },
            {
                "choice": "FOR",
                "id": "0xefdb9ba6b79e76f9e2bf937bba861fe110143c77-89",
                "reason": null,
                "weight": 7913043957022792000
            },
            {
                "choice": "FOR",
                "id": "0xf070cd4b5ba73a6b6a939dde513f79862bffcd25-89",
                "reason": null,
                "weight": 14942500000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf3571035c44eeb914681b5b125123bf4a3916792-89",
                "reason": null,
                "weight": 12233673144840192000
            },
            {
                "choice": "FOR",
                "id": "0xf51754d95c0b9bb416ab4915e9f10b04d04d29e5-89",
                "reason": null,
                "weight": 3824194520647374000
            },
            {
                "choice": "FOR",
                "id": "0xfa2aa0cc1879b7ec0d7ac5360b8f7f444d75b8e2-89",
                "reason": null,
                "weight": 14005604768258466000
            },
            {
                "choice": "FOR",
                "id": "0xfa2be53b00cb78c9855aaafb4e2072a93e3fbe56-89",
                "reason": null,
                "weight": 11904736648156717000
            },
            {
                "choice": "FOR",
                "id": "0xffe6a865440967ad098a14eff7007aee8a947f32-89",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xfffd05ae9db4d5f4e23e2f37395db2f87359bf5d-89",
                "reason": null,
                "weight": 5495994997649237000
            }
        ]
    },
    {
        "abstain_delegate_votes": null,
        "against_delegate_votes": null,
        "creation_time": null,
        "description": "# Scaling V4 and Supporting Unichain\n# Scaling V4 and Supporting Unichain\n\nPGOV is submitting the proposal on GFX Labs' behalf because GFX no longer has sufficient voting power to submit.\n\n\n\nGFX Labs proposes that the Uniswap DAO allocate funding to support the integration of Uniswap V4 on Ethereum in Oku, grant GFX Labs a blanket license exemption for future V4 deployments, and to add support for Unichain on Oku. This initiative aims to enhance Uniswap's reach, encourage liquidity migration to V4, and solidify the protocol’s position as the leading decentralized exchange.\n\n## EDITs/Updates\n\n* We have **updated** the Additional Use Grant language. Scroll down to read more.\n* We will be hosting office hours for delegates who would like to understand Oku's current swap volume, users, and other internal metrics on **Friday, the 9th, at 12:30 Central Time**. If you would like to attend, send Getty a DM on Telegram, and he will send you a meeting invite. Anyone unable to attend at that time, we are happy to schedule a 1:1. In the meantime, feel free to browse Oku's Uniswap V3 Analytics or to view the various Uniswap V3 deployments we have completed on DeFiLlama.\n* The plan is to post the onchain proposal on Friday, so voting will begin on Monday.\n* We will be on Tuesday's community call to discuss the proposal further.\n\n### Background\n\nIn 2022, GFX Labs was granted $1.6M from the Uniswap DAO to scale the Uniswap ecosystem and expand the protocol's presence across EVM chains. Today, Oku is live across 30+ chains, and we have expanded our services to offer best-in-class bridge and trade aggregation. With a dedicated interface for V3 pool analytics and a simplified LP management interface, Oku has served as a consistent and scalable growth channel for the wider Uniswap ecosystem.\n\nWe’ve deployed to a wide range of chains at our own expense – far exceeding the original scope of the grant – and have generated a high ROI by accelerating Uniswap adoption across new environments. Now, with the advent of Uniswap V4, it’s time to build the next generation of tooling for the next wave of liquidity.\n\n### Scale V4 and Add Unichain Support\n\nSince the launch of Uniswap V4 in January 2025, we’ve seen a surge in interest from users, partners, and hook developers eager to experiment with the new protocol’s capabilities. As one of the most active contributors to the Uniswap ecosystem infrastructure, GFX Labs views this momentum as a timely opportunity to scale V4 usage, reduce friction for LP’ing, and host an environment for hook developers to showcase their innovative pool adaptations. As we have provided for V3, GFX Labs will develop a dedicated V4 analytics interface to support hooked pool discovery and performance tracking.\n\n### Who benefits?\n\nThe Uniswap DAO’s ability to expand V4’s reach heavily depends on ecosystem builders and infrastructure. That is why supporting the flywheel between hook builders, liquidity migrators/providers, and traders is crucial. With V4’s flexibility also comes complexity. It is key that each stakeholder's user experience and needs are addressed and iterated upon so V4 can become the dominant DEX protocol. Oku will fill the gaps and support ecosystem players as a base layer user interface for developers, LPs, traders, and chains. EVM chains with V4 enabled will have separate interfaces to distinguish between hooked and vanilla pools.\n\n**Hook Devs**: Hook developers thrive when LP’ing is made easy, unlocking exposure to their unique market architecture\n\n**LPs**: Intuitive position management tools and highlighted yield farming opportunities for V4 pools\n\n**Traders**: Option to include V4 “hooked” pools for unique trading strategies & best execution\n\n**DAO**: Expand V4 footprint across all chains and highlight market opportunities for unique market structures\n\n### Proposed Plan\n\nV4 Development Scope\n\n* V4 Liquidity management\n* Pool analytics with historical performance data\n* Oku V4 data API for anyone building in the Uniswap ecosystem\n* Hook pool discovery via V4 analytics dashboard\n* Routing support for V4 traders\n\nFor the one-time integration and build-out of V4 on Ethereum Mainnet into Oku, we are requesting a total of $250K. The Uniswap DAO could expect delivery within two months of the proposal passing. Post launch, Oku will continue to improve the V4 interface and iterate based on feedback.\n\n* Backend infrastructure: $150,000. This would primarily focus on indexing the V4 protocol, adding a routing setup for V4 markets, and updating our peripheral systems to support V4.\n* Frontend development: $100,000. There are two phases here. The first would be designing new UI elements for pool creation, V4 LPing, V4 analytics, V4 trading, and any other UI updates necessary to support V3 and V4 in the same interface. The second phase is implementing the design improvements.\n\n### Unichain Deployment on Oku\n\n* Within two weeks of this proposal passing, Unichain and the **V3 deployment** will be available in Oku. Unichain users will have access to a full suite of Oku features, including a smart routing system integrated into 10 trade routers and 11 bridges.\n* As soon as we have the minimum viable backend and frontend support for V4, we will integrate the Unichain V4 deployment.\n\nGiven our long-standing relationship with the DAO and our concurrent request for the initial V4 integration, GFX Labs will waive the standard integration fee for integrating Unichain with Oku. Recognizing the benefit of a synergistic V3/V4 offering, instead we are requesting $90k - $7.5k per month - to cover operational and maintenance related costs. This cost structure is representative of preferential pricing for the Uniswap DAO.\n\n### Permissionless Licensing Agreement\n\nGFX Labs is requesting an [Additional Use Grant](https://support.uniswap.org/hc/en-us/articles/33829751588109-Uniswap-v4-licensing), which provides licensing permissions for V4 deployments to streamline the process of bringing V4 to new chains. As an established partner of the Uniswap ecosystem, this process maximizes the DAO’s ability to scale efficiently, support hook innovation, and increase V4 pool dominance across EVM.\n\nGranting GFX a license is an operational improvement. Rather than requiring each chain to go through a four-week governance process, our team can work closely with the UAC to ensure new deployments can happen quickly without eroding the DAO's priorities.\n\nDelegates will likely notice that this process closely aligns with the current process for deploying Uniswap V3 on new chains.\n\nFurther, before our team deploys Uniswap V4, the UAC must have approved it. GFX will only deploy the standard V4 contracts, and all deployments must be owned by UNI token holders. GFX will have no right to deploy V4 independently without the UAC's approval.\n\nBelow is the Additional Use Grant text proposed by the UF and their GC.\n\n```\nGFX Labs (“GFX”) is granted an Additional Limited Use Grant to allow GFX to use the Uniswap V4 Core software code (which is made available to GFX subject to the license available at https://github.com/Uniswap/v4-core/blob/main/licenses/BUSL_LICENSE (the “Uniswap Code”)) subject to the below limitations.\n\nAs part of this additional use grant, GFX receives a limited worldwide license to use the Uniswap Code for the purposes of creating, deploying and making available aspects of the Uniswap Protocol v4 (the “AMM”); and deploy the AMM as smart contracts on public blockchain networks.\n\nThis grant does not confer rights to sublicense, and GFX may not assign such rights (in whole or in part) to any third party, including in connection with any merger, consolidation, reorganization, change of control, spin out, or sale of all, or substantially all, of GFX’s assets or business.\n\nThis grant does not confer any rights to modify or alter the Uniswap Code.\n\nThis grant does not confer rights to deploy Uniswap V4 without the brand name (forking).\n\nThis grant requires affirmative approval by the Uniswap Accountability Committee (UAC) prior to deployment in a production environment.\n\nThis grant requires Uniswap V4 deployments to be owned by the Uniswap DAO.\nThis license is conditional on GFX complying with the terms of the Business Source License 1.1, made available at https://github.com/Uniswap/v4-core/blob/main/licenses/BUSL_LICENSE.\n```\n\nWith a new emphasis on V4 infrastructure, Oku further aligns itself as a standard bearer for the Uniswap ecosystem, with a focus on expanding utility and interoperability across EVM environments. By funding this proposal, the DAO positions itself to scale V4 usage, promote novel onchain markets, and support unique market innovation from the ground up.",
        "for_delegate_votes": null,
        "id": "88",
        "proposer": {
            "delegated_votes_raw": null,
            "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a",
            "number_votes": null,
            "token_holders_represented_amount": null
        },
        "quorum_votes": null,
        "state": "ACTIVE",
        "total_delegate_votes": null,
        "votes": [
            {
                "choice": "FOR",
                "id": "0x0057be07beef5d9b4beb9e2d147906e83d1915c8-88",
                "reason": null,
                "weight": 1573151803047202800
            },
            {
                "choice": "FOR",
                "id": "0x0100e22f222753f6021abeb3f7e4af4c57467cc9-88",
                "reason": null,
                "weight": 4707658469842507000
            },
            {
                "choice": "FOR",
                "id": "0x015122a625b45f68e6d795c0ab99fc7107e4c3b9-88",
                "reason": null,
                "weight": 4360000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x01de6487b3888e599f8145a7eca94da74837071c-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "ABSTAIN",
                "id": "0x057928bc52bd08e4d7ce24bf47e01ce99e074048-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x0579a616689f7ed748dc07692a3f150d44b0ca09-88",
                "reason": null,
                "weight": 101476005146459770000
            },
            {
                "choice": "FOR",
                "id": "0x05d84c3f01dbf8c3085e4b2fe5bc73c94c1b8e41-88",
                "reason": null,
                "weight": 8015664277551202000
            },
            {
                "choice": "FOR",
                "id": "0x06c4865ab16c9c760622f19a313a2e637e2e66a2-88",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x070341aa5ed571f0fb2c4a5641409b1a46b4961b-88",
                "reason": null,
                "weight": 3001101288486832000000000
            },
            {
                "choice": "FOR",
                "id": "0x0940e77c7a784c65a9726b7a4e6852c7e05276cc-88",
                "reason": null,
                "weight": 2209237684148285700
            },
            {
                "choice": "FOR",
                "id": "0x09ad31043b0b939576d5206b064ca1807c4160fd-88",
                "reason": null,
                "weight": 1530441027094370600
            },
            {
                "choice": "FOR",
                "id": "0x09cf30aaedeb144c6caf6f135d4582945b4191b7-88",
                "reason": null,
                "weight": 191639266252164100
            },
            {
                "choice": "ABSTAIN",
                "id": "0x0a0f04a231efbc29e1db7d086300ff550211c2f6-88",
                "reason": null,
                "weight": 46241847731945810000000
            },
            {
                "choice": "FOR",
                "id": "0x0de74ef8a6d719c544019e253afdafcfb7d23db3-88",
                "reason": null,
                "weight": 231411299715943800
            },
            {
                "choice": "FOR",
                "id": "0x0e9951bd0c3625f4a7b019e455c8090834c6a3af-88",
                "reason": null,
                "weight": 13142728991918232000
            },
            {
                "choice": "FOR",
                "id": "0x0ff1588d145479b384656645152e52f087a4fa19-88",
                "reason": null,
                "weight": 43718742436308410
            },
            {
                "choice": "FOR",
                "id": "0x1056e5c3d42d582b3dacf27336b16d63999b8a26-88",
                "reason": null,
                "weight": 390438099720170940
            },
            {
                "choice": "FOR",
                "id": "0x11069c08dd30aa4c17d73b0e3984a433a0e39fda-88",
                "reason": null,
                "weight": 402925517216111460000
            },
            {
                "choice": "FOR",
                "id": "0x12b30979b9a53bb0b42deaaa974ac9304fab0832-88",
                "reason": null,
                "weight": 2576571094910000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x134d35266e9075adc311182938f5f9083df6b65c-88",
                "reason": null,
                "weight": 194623777299749500
            },
            {
                "choice": "FOR",
                "id": "0x13bdae8c5f0fc40231f0e6a4ad70196f59138548-88",
                "reason": null,
                "weight": 3862039315385151700000000
            },
            {
                "choice": "FOR",
                "id": "0x168620f57dcbcd5d9ac84e5ca3c2ec753bd60c88-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x17296956b4e07ff8931e4ff4ea06709fab70b879-88",
                "reason": null,
                "weight": 7001000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1855f41b8a86e701e33199de7c25d3e3830698ba-88",
                "reason": null,
                "weight": 504601692054391850000000
            },
            {
                "choice": "FOR",
                "id": "0x19acb89cb4bd36f6e471c91585b95b966d33132e-88",
                "reason": null,
                "weight": 5808249186923794000
            },
            {
                "choice": "FOR",
                "id": "0x1a1e1cfb35a3c51e424710220b4b418de419516c-88",
                "reason": null,
                "weight": 6730816894574673000
            },
            {
                "choice": "FOR",
                "id": "0x1a9ab967c5672622c55023ea2fcb892e60da2e4a-88",
                "reason": null,
                "weight": 3742226664652157000
            },
            {
                "choice": "FOR",
                "id": "0x1b686ee8e31c5959d9f5bbd8122a58682788eead-88",
                "reason": "https://gov.uniswap.org/t/l2beat-delegate-platform/22449/12",
                "weight": 259669906039192030000000
            },
            {
                "choice": "AGAINST",
                "id": "0x1c05decb151a459e8b045a93f472d1b238204094-88",
                "reason": null,
                "weight": 268137336166465950
            },
            {
                "choice": "FOR",
                "id": "0x1c984538a1b411a646ac3ca30375fe0938e2f168-88",
                "reason": null,
                "weight": 125548349203586820
            },
            {
                "choice": "FOR",
                "id": "0x1de95917e3fdca7255abc01c7c85fa606a0c2f0d-88",
                "reason": null,
                "weight": 10960146254367330000
            },
            {
                "choice": "FOR",
                "id": "0x1f2e8ce2885818e681dc13c6d3665da63f47acdd-88",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x1f3d3a7a9c548be39539b39d7400302753e20591-88",
                "reason": null,
                "weight": 1000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x211d158941829c694060b6016d69c4568cd4a771-88",
                "reason": null,
                "weight": 234952616191391650
            },
            {
                "choice": "FOR",
                "id": "0x212baf65228fe03674da0efb88cac7eadb276db5-88",
                "reason": null,
                "weight": 2500004206607239500000000
            },
            {
                "choice": "FOR",
                "id": "0x21b3b193b71680e2fafe40768c03a0fd305efa75-88",
                "reason": null,
                "weight": 29000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x274829c52bba894d62a4931b46b76cfe0606ac26-88",
                "reason": null,
                "weight": 4271179400000000000
            },
            {
                "choice": "FOR",
                "id": "0x274d99d11cc3d3b0a56a6fdcc5dfffe07cec73f4-88",
                "reason": null,
                "weight": 2492494121413928000
            },
            {
                "choice": "FOR",
                "id": "0x29f68d986e07509f26ce22c03b2ce0a7024bd595-88",
                "reason": null,
                "weight": 5070448752563842000
            },
            {
                "choice": "FOR",
                "id": "0x2aa55cb56c454c432b912bb19bc21d54ce4ff742-88",
                "reason": null,
                "weight": 13289661071231597000
            },
            {
                "choice": "FOR",
                "id": "0x2bff0d5bc65b920806a50c5e27b879b05a6538ae-88",
                "reason": null,
                "weight": 130370993860371660
            },
            {
                "choice": "FOR",
                "id": "0x2cbd292a53a7cd3af3edc888b81ca8ab9c822c43-88",
                "reason": null,
                "weight": 24694718875274960000
            },
            {
                "choice": "FOR",
                "id": "0x2dabd1c849b5adc1fb421e043ba53be6bb2aec62-88",
                "reason": null,
                "weight": 224045915834371230
            },
            {
                "choice": "FOR",
                "id": "0x2e953cb08c0bfbb48e5f65cc1536de6383bce45d-88",
                "reason": null,
                "weight": 89019922135569180
            },
            {
                "choice": "FOR",
                "id": "0x2f2f665974261c4129b1dc6c359bd259cd66f78a-88",
                "reason": null,
                "weight": 16000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x32faeb79584659de53d1b165d00f11f3b4e44c93-88",
                "reason": "voting FOR this proposal to accelerate Uniswap V4 adoption and drive ecosystem growth.",
                "weight": 1185549793881505100000
            },
            {
                "choice": "FOR",
                "id": "0x343661eed86405a609dd051b3a3720da385f22cc-88",
                "reason": null,
                "weight": 12516898396271962000
            },
            {
                "choice": "FOR",
                "id": "0x34a813d4753ad2d6d40b92c01623087954c00f91-88",
                "reason": null,
                "weight": 5133894442761615000
            },
            {
                "choice": "FOR",
                "id": "0x37b463feae69d547f7d9cc3ff4bcb309928bd54d-88",
                "reason": null,
                "weight": 3977381618159529500
            },
            {
                "choice": "FOR",
                "id": "0x3821bc775f4a3f52fe34adf24b0f96d45c730bf0-88",
                "reason": null,
                "weight": 21491631689807460
            },
            {
                "choice": "FOR",
                "id": "0x3b1a9267ab7e6e2eb59f086baedd2ba8e6c01228-88",
                "reason": null,
                "weight": 1105907669366364900
            },
            {
                "choice": "FOR",
                "id": "0x3d50ce1d4568582e810719d388f278c6362e4133-88",
                "reason": null,
                "weight": 1169222541541337
            },
            {
                "choice": "FOR",
                "id": "0x3ddc7d25c7a1dc381443e491bbf1caa8928a05b0-88",
                "reason": null,
                "weight": 1076870215514875900000
            },
            {
                "choice": "FOR",
                "id": "0x3faa332d536cc32adc61897401a09ff2d78b742a-88",
                "reason": null,
                "weight": 11052741498628530000
            },
            {
                "choice": "FOR",
                "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a-88",
                "reason": null,
                "weight": 2501652338941591300000000
            },
            {
                "choice": "FOR",
                "id": "0x44424b581f8d2612ff603ae4e8c6e8746bd262d7-88",
                "reason": null,
                "weight": 181106967097929800
            },
            {
                "choice": "FOR",
                "id": "0x47356f1f586fb247bc9519c0dfde21e9f02277e5-88",
                "reason": null,
                "weight": 1155724729727085300000
            },
            {
                "choice": "FOR",
                "id": "0x475e41b482afc82bae8025d09d128f30b680e10c-88",
                "reason": null,
                "weight": 4637206733087450
            },
            {
                "choice": "FOR",
                "id": "0x477e89659cd4433dcb9cb8a9c607b73413a3238b-88",
                "reason": null,
                "weight": 10973334766172532
            },
            {
                "choice": "FOR",
                "id": "0x4d12a4aad451c3209ed3a660e463ba71fef37d7c-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d32d90d6535bd4e7eabaa27ee72932cb214bbfa-88",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x4d4ac65513fee380c596ac9edfac588782831bdf-88",
                "reason": null,
                "weight": 589949957653325200
            },
            {
                "choice": "FOR",
                "id": "0x4d9ba778b7f121e58e5d3bb6aef514e035a7c7f5-88",
                "reason": null,
                "weight": 1134628983244555800
            },
            {
                "choice": "FOR",
                "id": "0x4db656e69224f1405abfc642a5a7604e0fc9644b-88",
                "reason": null,
                "weight": 13137887449595806000
            },
            {
                "choice": "FOR",
                "id": "0x4dd7fc3a3b6457d1e67e3b046b2b0d2dcf25257d-88",
                "reason": null,
                "weight": 3742093716218786000
            },
            {
                "choice": "FOR",
                "id": "0x4e773359d475735a029a7cebdcf072ca85ffcf92-88",
                "reason": null,
                "weight": 11908703437997042000
            },
            {
                "choice": "FOR",
                "id": "0x4fc53cdfb93fa69058529aa2caa174581e7fb541-88",
                "reason": null,
                "weight": 1111950387064342400
            },
            {
                "choice": "FOR",
                "id": "0x53d6cd1009b773e71698eae30c7d77927aa88bd1-88",
                "reason": null,
                "weight": 12525867218855680000
            },
            {
                "choice": "FOR",
                "id": "0x53da33f96ecffe1cdf3842883c9ba3ba3b49c14b-88",
                "reason": null,
                "weight": 374907017282231700
            },
            {
                "choice": "FOR",
                "id": "0x59004ebd321ddeaf7e22f3f046798d6d35888e62-88",
                "reason": null,
                "weight": 11447675876126177000
            },
            {
                "choice": "FOR",
                "id": "0x5a4b09693ccaa2c3218592d0bafa7788a01f4600-88",
                "reason": null,
                "weight": 22261706270942680000
            },
            {
                "choice": "FOR",
                "id": "0x5b1aa687371f5f34600a4899918723d26d8521c6-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x61ff9cbe2d6ce98f4c8ecf3807339474f4c09630-88",
                "reason": null,
                "weight": 1110000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x664b81e1ce5714b7b5118f16b37e87e36fc69145-88",
                "reason": null,
                "weight": 26320705310797260000
            },
            {
                "choice": "FOR",
                "id": "0x66aa8bee5366b6b48811ae0dac9fe5e1eefe1621-88",
                "reason": null,
                "weight": 2500247840838060300000000
            },
            {
                "choice": "FOR",
                "id": "0x6753df3dd40fd96aded3146055773edeff5e09fd-88",
                "reason": null,
                "weight": 4128560487862273000
            },
            {
                "choice": "FOR",
                "id": "0x69f24ee429ca14df1b7006663ce1bb845d4ccac4-88",
                "reason": null,
                "weight": 12072450488566714000
            },
            {
                "choice": "FOR",
                "id": "0x6de8448e7d5f58af394cc9540abe703d0c955dfd-88",
                "reason": "https://gov.uniswap.org/t/proxy-prev-boardroom-delegate-platform/25385/13",
                "weight": 4605350580866312000
            },
            {
                "choice": "AGAINST",
                "id": "0x6f9bb7e454f5b3eb2310343f0e99269dc2bb8a1d-88",
                "reason": null,
                "weight": 2999766493207432500000
            },
            {
                "choice": "FOR",
                "id": "0x72677a609222443495385dea8e0f8907aa5806b5-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x72b4b2553b2a6c17b558e628ff5b6b7141a68658-88",
                "reason": null,
                "weight": 10762956274627004
            },
            {
                "choice": "FOR",
                "id": "0x7678ae25eb2059e2371255f19d8cde683d5d81c8-88",
                "reason": null,
                "weight": 1058961550784107900
            },
            {
                "choice": "FOR",
                "id": "0x768e4afbb8e8a8252aca1d35b6b2537e3df3caa4-88",
                "reason": null,
                "weight": 1002335369085796400
            },
            {
                "choice": "FOR",
                "id": "0x78a147b78078fb8fbb2b0a9ac6788fa2c3dd3dcc-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x78c9ee28f69f57f429168a433772432428882f25-88",
                "reason": null,
                "weight": 1003942226607973100
            },
            {
                "choice": "ABSTAIN",
                "id": "0x7ae109a63ff4dc852e063a673b40bed85d22e585-88",
                "reason": "d",
                "weight": 1250520160000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x7bb9dccc97052ddef05141897fe8313fd4ad0418-88",
                "reason": null,
                "weight": 16585224809275220000
            },
            {
                "choice": "FOR",
                "id": "0x7d54249f54d1b2e71e2a41825962311e36236030-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x7f21b3e952ae82d10f66e03a9b39d198728a31e0-88",
                "reason": null,
                "weight": 411704160510895550
            },
            {
                "choice": "FOR",
                "id": "0x80e1a87c37ad8350572245541b9fdf3039155693-88",
                "reason": null,
                "weight": 12512260127015336000
            },
            {
                "choice": "FOR",
                "id": "0x8178e58b1eeea0839b869af8da0de2bef5688c5b-88",
                "reason": null,
                "weight": 48483001515903340000
            },
            {
                "choice": "FOR",
                "id": "0x84698c0b87691eebbb4a11ab20c49916e0d7ecd9-88",
                "reason": null,
                "weight": 144547868929571300
            },
            {
                "choice": "FOR",
                "id": "0x86b892c9d4bdb75a69482f79cc17eca55343adab-88",
                "reason": null,
                "weight": 5041373440196904000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x8787fc2de4de95c53e5e3a4e5459247d9773ea52-88",
                "reason": null,
                "weight": 1461322083093583000000000
            },
            {
                "choice": "FOR",
                "id": "0x89e9c7d0d709cc65d3e70cbf1d8561ded00f4c5b-88",
                "reason": null,
                "weight": 10814544214736898000
            },
            {
                "choice": "FOR",
                "id": "0x8abfdd1563ca17eb9b180ac271f05d5dd035441a-88",
                "reason": null,
                "weight": 2500000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x8b1fd8e2a49b06573c59b6da602d13fb78e31de0-88",
                "reason": null,
                "weight": 14986234430431703000
            },
            {
                "choice": "FOR",
                "id": "0x909cc7e298a0a3920131cbea25a1267af724dedc-88",
                "reason": null,
                "weight": 194424443180759230
            },
            {
                "choice": "FOR",
                "id": "0x9145a391dae8feb36f1d9c606efd0eb4b63e7618-88",
                "reason": null,
                "weight": 6646098522270154000
            },
            {
                "choice": "FOR",
                "id": "0x9351bbb86eb30a602693498f761391bfe3c7b486-88",
                "reason": null,
                "weight": 63535885507842270
            },
            {
                "choice": "FOR",
                "id": "0x9588b068b14e6397bb47ad3763f9fb5e2f7d7cae-88",
                "reason": null,
                "weight": 5374331805910729000
            },
            {
                "choice": "FOR",
                "id": "0x9a0f21b00d45856bf67be52d822fa3d4f8888de8-88",
                "reason": null,
                "weight": 1227444092654563800
            },
            {
                "choice": "FOR",
                "id": "0x9db7acdd592b551fb69ceb26a9a8a09019952ec3-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xa280bf4efcf1d68594c600bd1104678d577d0cf8-88",
                "reason": null,
                "weight": 200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa2ed07adc1a25074b67b493af7dfec1514c2d008-88",
                "reason": null,
                "weight": 10025021922760587000
            },
            {
                "choice": "FOR",
                "id": "0xa622279f76ddbed4f2cc986c09244262dba8f4ba-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xa6ac718a9bc4f265f6e1297168e55d05d3722bf3-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xa6e8772af29b29b9202a073f8e36f447689beef6-88",
                "reason": null,
                "weight": 83762409349271090000000
            },
            {
                "choice": "FOR",
                "id": "0xa763333a1abb7f534f3ef6b457b8045392767ef4-88",
                "reason": null,
                "weight": 25065431241585300000
            },
            {
                "choice": "FOR",
                "id": "0xa77294828d42b538890fa6e97adffe9305536171-88",
                "reason": null,
                "weight": 1300000000000000300
            },
            {
                "choice": "FOR",
                "id": "0xa8293dd8eb52564a35b8357a539146321b934153-88",
                "reason": null,
                "weight": 32941026986416714000
            },
            {
                "choice": "FOR",
                "id": "0xa8e17be2b11e744561859c9c31ea060ee30bf37c-88",
                "reason": null,
                "weight": 1172131702632730600
            },
            {
                "choice": "FOR",
                "id": "0xaa30037cdd4aa927a3b4df9065e662ebd73a2f53-88",
                "reason": null,
                "weight": 3434587510437592000
            },
            {
                "choice": "FOR",
                "id": "0xaac35d953ef23ae2e61a866ab93dea6ec0050bcd-88",
                "reason": null,
                "weight": 406623649978093500000000
            },
            {
                "choice": "FOR",
                "id": "0xacc94d70faf5539197307bc6e01907e60d760b28-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xad39aeb41beceb2e1c86e071bb2e4ffc2f51ca74-88",
                "reason": null,
                "weight": 660000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xaf05b88ac16ad3272d7ade699db51d03c4ff9f91-88",
                "reason": null,
                "weight": 338882697840930800
            },
            {
                "choice": "FOR",
                "id": "0xafec0951ec3c1ac7017f80d2f4c2d668755cc23b-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb12ddbd97aafeeef0c29acd3bbe3cab65b6127d5-88",
                "reason": null,
                "weight": 12358349434717497000
            },
            {
                "choice": "FOR",
                "id": "0xb18053b571ddaf1853459b981a6a505b004b48f2-88",
                "reason": null,
                "weight": 62578605040248424
            },
            {
                "choice": "FOR",
                "id": "0xb1f09afdfd9014c06680b56c71ca45524e8371fb-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb26f0100a404c5e5c3fd35221dd7e5955fd8d6eb-88",
                "reason": null,
                "weight": 5150797207194383000
            },
            {
                "choice": "FOR",
                "id": "0xb3313b023e68cda95d7b625200e1b0fe6335a0c2-88",
                "reason": null,
                "weight": 34121831573042774000
            },
            {
                "choice": "FOR",
                "id": "0xb331abd0e1e1b6c3ddd2cedf95c19b6a0fba7174-88",
                "reason": null,
                "weight": 115752800953089580
            },
            {
                "choice": "FOR",
                "id": "0xb35659cbac913d5e4119f2af47fd490a45e2c826-88",
                "reason": "The Event Horizon Community voted FOR on this Proposal (ehUNI-60): EventHorizon.vote/vote/uniswap/ehUNI-60",
                "weight": 9058054504011645000000
            },
            {
                "choice": "FOR",
                "id": "0xb49f8b8613be240213c1827e2e576044ffec7948-88",
                "reason": null,
                "weight": 2500597954562634000000000
            },
            {
                "choice": "FOR",
                "id": "0xb7585ac904c4b5edb6e471811e0fbeb408dc30de-88",
                "reason": null,
                "weight": 513615571482232500000
            },
            {
                "choice": "FOR",
                "id": "0xb79294d00848a3a4c00c22d9367f19b4280689d7-88",
                "reason": null,
                "weight": 1005953928446758000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xb83405aaee2a54a08022403939736bf5b33510e1-88",
                "reason": null,
                "weight": 22662122720000000000
            },
            {
                "choice": "FOR",
                "id": "0xb89a171141f7bdd5000c0b5b0f5808edea9e7f37-88",
                "reason": null,
                "weight": 6573891511187078000
            },
            {
                "choice": "FOR",
                "id": "0xb933aee47c438f22de0747d57fc239fe37878dd1-88",
                "reason": null,
                "weight": 2746997055348835400000000
            },
            {
                "choice": "FOR",
                "id": "0xb9c779e67e1a2f7b42eb5b6edb333b7a50858773-88",
                "reason": null,
                "weight": 12511243006927938000
            },
            {
                "choice": "FOR",
                "id": "0xbbf040bc646df1a1c5577df0b098fb9d25304e0d-88",
                "reason": null,
                "weight": 11951282137019533000
            },
            {
                "choice": "FOR",
                "id": "0xbc8c39bac584cf093865abcb195e49909f23ef51-88",
                "reason": null,
                "weight": 11592713073990822000
            },
            {
                "choice": "FOR",
                "id": "0xbe6e0481e9fce3145977da0fa41d10269138d2a6-88",
                "reason": null,
                "weight": 231215451923729600
            },
            {
                "choice": "FOR",
                "id": "0xbec643bd5b7f5e9190617ca4187ef0455950c51c-88",
                "reason": null,
                "weight": 5000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xbecafae450b9f573fcda44141022e1942bb700e7-88",
                "reason": null,
                "weight": 12844597773094033000
            },
            {
                "choice": "FOR",
                "id": "0xc0220349d63349162ef27a9c68cff0e8f8a5fa46-88",
                "reason": null,
                "weight": 11572911622860860000
            },
            {
                "choice": "FOR",
                "id": "0xc2a4a819c29fc5a487b9c7f03ea01568cc71badf-88",
                "reason": null,
                "weight": 10488884129532790000
            },
            {
                "choice": "FOR",
                "id": "0xc3a2821727e9e5fa690f8c69c5d8e0899aa0e6ee-88",
                "reason": null,
                "weight": 8554287073301785
            },
            {
                "choice": "FOR",
                "id": "0xc49949a325266f82ef1a9412bc30ef6ecde06038-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc4cd22191f27d2cbcab7ba7be07b3655688147bc-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0xc5547b4907418c2ec0c2a95bec6fee8354657759-88",
                "reason": "We are abstaining from this proposal due to outstanding concerns regarding transparency, potential conflicts of interest, and misalignment of value capture with the broader Uniswap DAO community. GFX Labs, the team behind Oku, appears to benefit commercially from Uniswap v3 deployments via a subscription-based model, with minimal direct benefit to UNI holders. The request for a v4 license exemption further consolidates this advantage without clear justification for DAO funding or strategic alignment.",
                "weight": 2684200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc6d7208dadee4f431bd0f3f11e7d4c91ff51bfb2-88",
                "reason": null,
                "weight": 1111000000000000000
            },
            {
                "choice": "AGAINST",
                "id": "0xccfcdf6fb169c7dc94dc2b1880271b99c16544a2-88",
                "reason": null,
                "weight": 207214596109569730
            },
            {
                "choice": "FOR",
                "id": "0xcdaa63e7762d078c07f344eb05b1d6c792fff2e5-88",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xcdf6e34b609a29a07def2d469816d9ae5a689b4a-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd2602c7bdfc9f413974e944280bbfae275d1b1b6-88",
                "reason": null,
                "weight": 1069979970235306100
            },
            {
                "choice": "FOR",
                "id": "0xd29eeafd7d38f9318417bd5dc304d3935767155f-88",
                "reason": null,
                "weight": 264706551001802980
            },
            {
                "choice": "FOR",
                "id": "0xd2abcf32f02993b38c5df1c7f2bb10cea9d094cd-88",
                "reason": null,
                "weight": 133767040438964320
            },
            {
                "choice": "FOR",
                "id": "0xd6368d2e97695a30678e5ec2668f23c05320522e-88",
                "reason": null,
                "weight": 142817244572586910
            },
            {
                "choice": "FOR",
                "id": "0xd66427a092c55e1ee974edfe842d99ddb7f05b95-88",
                "reason": null,
                "weight": 10410507395989774000
            },
            {
                "choice": "FOR",
                "id": "0xd67cb3bdcc300f10dd25fb62dadb8c9242f0d5b7-88",
                "reason": null,
                "weight": 5307053534238726000
            },
            {
                "choice": "FOR",
                "id": "0xd6b8d0e159b29074a5df734e590c9010a0069b80-88",
                "reason": null,
                "weight": 2031686506419111400
            },
            {
                "choice": "FOR",
                "id": "0xd82803b7b9a5eb1d5fc558fd619afc6c031cd0b1-88",
                "reason": null,
                "weight": 1430000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xd8dea87ddcc0c3c1464ded6102e4d3e829d0ae41-88",
                "reason": null,
                "weight": 1657313873315690000
            },
            {
                "choice": "FOR",
                "id": "0xd9995dabb781dcc8ec408fea5f293712febf17db-88",
                "reason": null,
                "weight": 159693942462662200
            },
            {
                "choice": "FOR",
                "id": "0xda00e9be67899b4aa0a8d35120c9e905f7c73f51-88",
                "reason": null,
                "weight": 99797102370172980
            },
            {
                "choice": "FOR",
                "id": "0xdc3e25c323035b226d9aab3f8ea4e9ea4f95fc3f-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xdc756a92c3479d46c39ac575f19b35f90c424a9a-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xde7d884caa681423f7dd59272e9ec25b47552990-88",
                "reason": null,
                "weight": 217918107638394300
            },
            {
                "choice": "AGAINST",
                "id": "0xdeb0db31a30104880be8e9940d3d4d47f4c56976-88",
                "reason": null,
                "weight": 148238917706671200
            },
            {
                "choice": "FOR",
                "id": "0xded3f9b06ce504babf97d8766675566ccaf3c962-88",
                "reason": null,
                "weight": 298149846656300740
            },
            {
                "choice": "FOR",
                "id": "0xe18c849a113b15685858e5cd96096f902fd7d46b-88",
                "reason": null,
                "weight": 5463776386146996000
            },
            {
                "choice": "FOR",
                "id": "0xe22817a91a14d61cb3691954983663425f5513b1-88",
                "reason": null,
                "weight": 187110153155401500000
            },
            {
                "choice": "FOR",
                "id": "0xe37aeae21e50c97766e3acc6f9f34d4332dd239a-88",
                "reason": null,
                "weight": 78990957406952720
            },
            {
                "choice": "FOR",
                "id": "0xe5707b243cba7326fe851027fd1d5d9e0b403510-88",
                "reason": null,
                "weight": 129483858683847420
            },
            {
                "choice": "FOR",
                "id": "0xe594469fde6ae29943a64f81d95c20f5f8eb2e04-88",
                "reason": "Oku is the way!",
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xe5bde866b2dd33a2aec4c2ca2dd446a084397091-88",
                "reason": null,
                "weight": 150047389746581860
            },
            {
                "choice": "FOR",
                "id": "0xe6b84dad5d26de2712d0c524dab35610e71b452d-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xe8eeeada50b535f415d630791f330dabf3870877-88",
                "reason": null,
                "weight": 120609834265912580
            },
            {
                "choice": "ABSTAIN",
                "id": "0xe93d59cc0bcecfd4ac204827ef67c5266079e2b5-88",
                "reason": null,
                "weight": 2500654725731614500000000
            },
            {
                "choice": "FOR",
                "id": "0xec8b102cd5839d149c47cd3842a89e29b1ded718-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9-88",
                "reason": null,
                "weight": 2503920676298366000000000
            },
            {
                "choice": "FOR",
                "id": "0xed4ca23fe53a936f3b74906b731f730dfd269508-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xedb2de6ecccb94894ef67e320ad2557b7a821897-88",
                "reason": null,
                "weight": 38132618918460650
            },
            {
                "choice": "FOR",
                "id": "0xee2acdcd6c9d46e216ccaab94899f26234d258a7-88",
                "reason": null,
                "weight": 120000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xee3b9acdfd7eabaef84b7ea69067233b90874d02-88",
                "reason": null,
                "weight": 75882505115427440
            },
            {
                "choice": "FOR",
                "id": "0xee400d0fe9ade577518307461910ab1a2f570de3-88",
                "reason": null,
                "weight": 11904724615745915000
            },
            {
                "choice": "FOR",
                "id": "0xefdb9ba6b79e76f9e2bf937bba861fe110143c77-88",
                "reason": null,
                "weight": 7913043957022792000
            },
            {
                "choice": "FOR",
                "id": "0xf1877ddcdd6458529abfa77c522b441811bb9f94-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xf3571035c44eeb914681b5b125123bf4a3916792-88",
                "reason": null,
                "weight": 12233673144840192000
            },
            {
                "choice": "FOR",
                "id": "0xf51754d95c0b9bb416ab4915e9f10b04d04d29e5-88",
                "reason": null,
                "weight": 3824194520647374000
            },
            {
                "choice": "FOR",
                "id": "0xf5f3b278a355a6b527d03e1b2b11ffebdc1b90ee-88",
                "reason": null,
                "weight": 86050030680395860
            },
            {
                "choice": "FOR",
                "id": "0xf6dc93dcaa16b1d48eb9929b9a8830331c89963a-88",
                "reason": null,
                "weight": 198740861399058800
            },
            {
                "choice": "FOR",
                "id": "0xf9551c66995ed3ff9bb05c9fd7ff148bd75dc99a-88",
                "reason": null,
                "weight": 250011547134276450000000
            },
            {
                "choice": "FOR",
                "id": "0xfa2aa0cc1879b7ec0d7ac5360b8f7f444d75b8e2-88",
                "reason": null,
                "weight": 14005604768258466000
            },
            {
                "choice": "FOR",
                "id": "0xfa2be53b00cb78c9855aaafb4e2072a93e3fbe56-88",
                "reason": null,
                "weight": 11904736648156717000
            },
            {
                "choice": "FOR",
                "id": "0xfb0f0c37a3452c6a4a2a7d45d453a391b305fe5a-88",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xfffd05ae9db4d5f4e23e2f37395db2f87359bf5d-88",
                "reason": null,
                "weight": 5495994997649237000
            }
        ]
    },
    {
        "abstain_delegate_votes": null,
        "against_delegate_votes": null,
        "creation_time": null,
        "description": "# UAC Renewal S4\nFor the full proposal, please see this [forum post](https://gov.uniswap.org/t/uniswap-accountability-committee-uac-season-3-report/25467).\n\nThe UAC has now been operating for the past three seasons, each of which span a duration of roughly 7 months, and is looking to renew for S4, with elections for two new members upon successful completion of this vote. An evolution of the committee has led it to become the DAO’s go-to operational body for handling a multitude of different responsibilities, although it merely began as a committee to oversee cross-chain deployments upon expiration of the Uniswap v3 Business Source License (BSL). Today, the UAC oversees:\n* Cross-chain deployment coordination\n* ENS record management\n* Disbursement and accounting of service provider, grantee, and working groups’ compensation\n* Custody of DAO-approved funds on Ethereum mainnet\n* Incentive distribution across a multitude of EVM-compatible chains\n* Governance community calls\n* Assisting with miscellaneous DAO operations like helping teams sponsor proposals\n* Managing the newly established Foundation Feedback Group (FFG)\nThis attached report on the forums outlines the specific operations behind the UAC from the previous season, along with an update regarding the financial situation of DAO programs and working groups. The last section will act as the request for comment (RFC) to renew the UAC and balance accounts.\n\nWe urge delegates to please review the full report and RFC. \n\nA summary of the renewal ask and proposed budget is below:\n* We will maintain the 5-member team as it’s an optimal number for dividing workload and distributing multisig security responsibilities.\n* Increase the budgeted weekly hours from 7.5 to 10, bringing the monthly total 40 hours.\n* Sustain the staggered election system to retain three current UAC members to prevent junctions between ongoing projects and training entirely new teams. Two out of the five members must either volunteer to drop their position, or there must be an internal vote to select which three members continue onto the next season\n* Budget Ask:\n    * $320,000 for UAC runway through December 2025, which is the budgeted ~40 hours/month, at the same and previous seasons $200/hr rate, for 8 months. This timeline aligns well with the end of the year and existing UAC programs, like the FFG, which is meant to conclude EOY 2025.\n    * $50,000 for discretionary operations budget, which will allow us to continue paying for tools like DEN and SafeNotes—and other discretionary items down the road. This budget will allow the UAC to allocate capital to build supplemental materials like data dashboards without requesting additional capital through an onchain vote.\nSummary for UAC Temp Check: Allocate $370k of UNI for UAC Season 4 renewal.\n\n$370,000 @ $5.3/UNI -> 69811 UNI",
        "for_delegate_votes": null,
        "id": "87",
        "proposer": {
            "delegated_votes_raw": null,
            "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a",
            "number_votes": null,
            "token_holders_represented_amount": null
        },
        "quorum_votes": null,
        "state": "EXECUTED",
        "total_delegate_votes": null,
        "votes": [
            {
                "choice": "FOR",
                "id": "0x000a99532e11ad7b06c26ceade3655ed64f68467-87",
                "reason": null,
                "weight": 158256728132025730
            },
            {
                "choice": "AGAINST",
                "id": "0x00db9d455404b9288a453ac90f6d8ead51f2e32c-87",
                "reason": null,
                "weight": 178134321607394020
            },
            {
                "choice": "FOR",
                "id": "0x0100e22f222753f6021abeb3f7e4af4c57467cc9-87",
                "reason": null,
                "weight": 4707658469842507000
            },
            {
                "choice": "FOR",
                "id": "0x019ed608dd806b80193942f2a960e7ac8abb2ee3-87",
                "reason": null,
                "weight": 21918767330923577000
            },
            {
                "choice": "FOR",
                "id": "0x026ff7f1767ad7b133fe456fd6e4f72e20f49389-87",
                "reason": null,
                "weight": 158478693265585440
            },
            {
                "choice": "FOR",
                "id": "0x057928bc52bd08e4d7ce24bf47e01ce99e074048-87",
                "reason": "Renewing the UAC ensures operational continuity across key DAO functions like fund disbursement, governance support, and cross-chain coordination. The proposed budget is reasonable and supports expanding responsibilities with increased efficiency.",
                "weight": 2684200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x0579a616689f7ed748dc07692a3f150d44b0ca09-87",
                "reason": null,
                "weight": 101476005146459770000
            },
            {
                "choice": "FOR",
                "id": "0x05bb5ef06ba0903bdf30e612cf4fe9862471317b-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x070341aa5ed571f0fb2c4a5641409b1a46b4961b-87",
                "reason": null,
                "weight": 3001101135096709500000000
            },
            {
                "choice": "FOR",
                "id": "0x0940e77c7a784c65a9726b7a4e6852c7e05276cc-87",
                "reason": null,
                "weight": 2209237684148285700
            },
            {
                "choice": "FOR",
                "id": "0x09cf30aaedeb144c6caf6f135d4582945b4191b7-87",
                "reason": null,
                "weight": 191639266252164100
            },
            {
                "choice": "FOR",
                "id": "0x0a0f04a231efbc29e1db7d086300ff550211c2f6-87",
                "reason": null,
                "weight": 46241847731945810000000
            },
            {
                "choice": "FOR",
                "id": "0x0bef930f5a00d075915eb6d3b13d73fde553edf6-87",
                "reason": null,
                "weight": 128111285603519600
            },
            {
                "choice": "FOR",
                "id": "0x104c5d4c8a2439732735eac71b8abf84d74f8cd3-87",
                "reason": null,
                "weight": 141490824344265730
            },
            {
                "choice": "FOR",
                "id": "0x11069c08dd30aa4c17d73b0e3984a433a0e39fda-87",
                "reason": null,
                "weight": 402925517216111460000
            },
            {
                "choice": "FOR",
                "id": "0x12b30979b9a53bb0b42deaaa974ac9304fab0832-87",
                "reason": "https://gov.uniswap.org/t/seedgov-delegate-platform/23987/53",
                "weight": 1999965720490000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x134d35266e9075adc311182938f5f9083df6b65c-87",
                "reason": null,
                "weight": 194623777299749500
            },
            {
                "choice": "FOR",
                "id": "0x1384e4bc3ae7104ccb9e3c5d3e4acda7235f00d8-87",
                "reason": null,
                "weight": 1684137300687418400
            },
            {
                "choice": "FOR",
                "id": "0x13bdae8c5f0fc40231f0e6a4ad70196f59138548-87",
                "reason": null,
                "weight": 3862039844466877000000000
            },
            {
                "choice": "FOR",
                "id": "0x147bfb68baa25b70d0fc1931a4b4941c7f60ff2e-87",
                "reason": null,
                "weight": 135546009630528140
            },
            {
                "choice": "FOR",
                "id": "0x155e9d7f9add12ad8c051dd0dc3c39494618af8c-87",
                "reason": null,
                "weight": 136805762546403580
            },
            {
                "choice": "FOR",
                "id": "0x168620f57dcbcd5d9ac84e5ca3c2ec753bd60c88-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x17296956b4e07ff8931e4ff4ea06709fab70b879-87",
                "reason": null,
                "weight": 7001000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1824a96fcc37a8d21703b38ff242fafcc388b75e-87",
                "reason": null,
                "weight": 284290568351731940
            },
            {
                "choice": "FOR",
                "id": "0x182fcf35d9065375c0c74fccb13dffe912ca83b3-87",
                "reason": null,
                "weight": 459179480000000000000
            },
            {
                "choice": "FOR",
                "id": "0x19acb89cb4bd36f6e471c91585b95b966d33132e-87",
                "reason": null,
                "weight": 5808249186923794000
            },
            {
                "choice": "FOR",
                "id": "0x1a7971e6257b5259f3a781c435de2905b21af2d0-87",
                "reason": null,
                "weight": 101446996351582450
            },
            {
                "choice": "FOR",
                "id": "0x1a9ab967c5672622c55023ea2fcb892e60da2e4a-87",
                "reason": null,
                "weight": 3742226664652157000
            },
            {
                "choice": "FOR",
                "id": "0x1af4d658f73dfd69cb5ec35aa27ae6308998f248-87",
                "reason": null,
                "weight": 117244706542478720
            },
            {
                "choice": "FOR",
                "id": "0x1b686ee8e31c5959d9f5bbd8122a58682788eead-87",
                "reason": null,
                "weight": 259669906039192030000000
            },
            {
                "choice": "AGAINST",
                "id": "0x1c05decb151a459e8b045a93f472d1b238204094-87",
                "reason": null,
                "weight": 268137336166465950
            },
            {
                "choice": "FOR",
                "id": "0x1d1a7b1ca3c1b326d742bad93dce27fba380a0ac-87",
                "reason": null,
                "weight": 113633886653918260
            },
            {
                "choice": "FOR",
                "id": "0x1dfa55e66a81b0a2efc86587a9bf07757b7f986c-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x1e7e8409cc2d3d53555bfa973c4fe0160b6a65d4-87",
                "reason": null,
                "weight": 118816310460019170
            },
            {
                "choice": "FOR",
                "id": "0x1e8be975fa4ccde00d57103aa9d6ba8574959ff4-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x1f1d8ef62c069d93c8fc9a2cdb5f76337b7867d7-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x1f3d3a7a9c548be39539b39d7400302753e20591-87",
                "reason": null,
                "weight": 1000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x211d158941829c694060b6016d69c4568cd4a771-87",
                "reason": null,
                "weight": 234952616191391650
            },
            {
                "choice": "FOR",
                "id": "0x21b3b193b71680e2fafe40768c03a0fd305efa75-87",
                "reason": null,
                "weight": 29000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x22907338085d5e9f0a379a139f0ccbc99878b6fe-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x22ff9a5afa2b3e294154c561342c04f6293ccc99-87",
                "reason": null,
                "weight": 123596387705310640
            },
            {
                "choice": "FOR",
                "id": "0x282951b4acaf21ca7574a9c59650cee2d51508b3-87",
                "reason": null,
                "weight": 127205759363956900
            },
            {
                "choice": "FOR",
                "id": "0x2a13c7d041e12d9cb489c6f552be8aea3a071c74-87",
                "reason": null,
                "weight": 103673526611419490
            },
            {
                "choice": "FOR",
                "id": "0x2abfbd2a34c140806ea5ccb7aca370caed25ba80-87",
                "reason": null,
                "weight": 91556839060667860
            },
            {
                "choice": "FOR",
                "id": "0x2ad89b2ae3e390d24f6af09bf0aeb94756dcdbdc-87",
                "reason": null,
                "weight": 206092682521002140
            },
            {
                "choice": "FOR",
                "id": "0x2bff0d5bc65b920806a50c5e27b879b05a6538ae-87",
                "reason": null,
                "weight": 130370993860371660
            },
            {
                "choice": "FOR",
                "id": "0x2f1cbb5ef7c05e92a24a15a564069ea486266e73-87",
                "reason": null,
                "weight": 418543456016042000
            },
            {
                "choice": "FOR",
                "id": "0x2f2f665974261c4129b1dc6c359bd259cd66f78a-87",
                "reason": null,
                "weight": 11790309905263606000
            },
            {
                "choice": "FOR",
                "id": "0x30ac8ce335cbb00e767ac1d942eb48bb7f10c78e-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x30fd6ef83c05a37e3a9fd160d82bf61e5b64cf5d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x32faeb79584659de53d1b165d00f11f3b4e44c93-87",
                "reason": null,
                "weight": 1185549793881505100000
            },
            {
                "choice": "FOR",
                "id": "0x33e8581f812585cd2f277b6e40c26f7d08a5f2a9-87",
                "reason": null,
                "weight": 143141026842418720
            },
            {
                "choice": "FOR",
                "id": "0x3511234945e71c792b053a6f1fb5458fb28691e6-87",
                "reason": null,
                "weight": 117963508863652510
            },
            {
                "choice": "FOR",
                "id": "0x3630f939a35c52957143e7ad45f31ce486715416-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x36ba23241ff9ed173ac2c384d0e4760536d4b435-87",
                "reason": null,
                "weight": 140285177311208270
            },
            {
                "choice": "FOR",
                "id": "0x37b463feae69d547f7d9cc3ff4bcb309928bd54d-87",
                "reason": null,
                "weight": 3977381618159529500
            },
            {
                "choice": "FOR",
                "id": "0x37c8dc884b66a504607b75cdbdb30ad3fda93068-87",
                "reason": null,
                "weight": 1200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x3821bc775f4a3f52fe34adf24b0f96d45c730bf0-87",
                "reason": null,
                "weight": 21491631689807460
            },
            {
                "choice": "FOR",
                "id": "0x3b1a9267ab7e6e2eb59f086baedd2ba8e6c01228-87",
                "reason": null,
                "weight": 1105907669366364900
            },
            {
                "choice": "FOR",
                "id": "0x3b3d96d7ba6d981ed0861e54d6298947b495f68f-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3d61c77be3d3019cd4c1594896d358afe1ed69be-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3da9cbb06b82cc30f132e1ea2612b96acf49cce5-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3dd3b479864acf12e6e6113b09d074660c7972e5-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3ddc7d25c7a1dc381443e491bbf1caa8928a05b0-87",
                "reason": null,
                "weight": 1076870215514875900000
            },
            {
                "choice": "FOR",
                "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a-87",
                "reason": null,
                "weight": 2501686002425779000000000
            },
            {
                "choice": "FOR",
                "id": "0x405202c2686dae017b2c3dc917512fde0e06833b-87",
                "reason": null,
                "weight": 114831219910677420
            },
            {
                "choice": "FOR",
                "id": "0x406465d986136010dc132f9541c1b836b6fb2b8f-87",
                "reason": null,
                "weight": 118241483888337100
            },
            {
                "choice": "FOR",
                "id": "0x414c3dcae423ff2a5e88f2668585a1ce82dc64d0-87",
                "reason": null,
                "weight": 113545635677554020
            },
            {
                "choice": "ABSTAIN",
                "id": "0x418735fab2b5631355b8d136793bac69f400bc06-87",
                "reason": null,
                "weight": 5700000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x418e84552b0c09c393c1bb0742aec323ce21e0a4-87",
                "reason": null,
                "weight": 140163610153605020
            },
            {
                "choice": "FOR",
                "id": "0x42a9b82d35839c4760ceb82d848f0d1355bcf7e4-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x44424b581f8d2612ff603ae4e8c6e8746bd262d7-87",
                "reason": null,
                "weight": 181106967097929800
            },
            {
                "choice": "FOR",
                "id": "0x463ba5667ac4aabd51e64f4f09963c81366bf3ac-87",
                "reason": null,
                "weight": 221029923718409860
            },
            {
                "choice": "FOR",
                "id": "0x469d296f2a381d04ca0eed37387d80af92e65cd3-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x474cfe1d9bb9ea836dbd7a54a3932c5349ddbf8d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x477e89659cd4433dcb9cb8a9c607b73413a3238b-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x47c0f3ec73c26dbcc6f49706a93fa9c100024659-87",
                "reason": null,
                "weight": 103188253736526700
            },
            {
                "choice": "ABSTAIN",
                "id": "0x47f3b28bcd2897a7daf275b0c233ae757d5ae359-87",
                "reason": null,
                "weight": 516935489609398700
            },
            {
                "choice": "FOR",
                "id": "0x4894dde949598b8b85dc8988f680c57146f82e02-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x491f0a51db8de30fe561704c31b1f39f177e9fbb-87",
                "reason": null,
                "weight": 133401487714990930
            },
            {
                "choice": "AGAINST",
                "id": "0x4cda9b3675d4df9966f9f772b7b1398a4b107053-87",
                "reason": null,
                "weight": 129985934217897300
            },
            {
                "choice": "FOR",
                "id": "0x4d32d90d6535bd4e7eabaa27ee72932cb214bbfa-87",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d4ac65513fee380c596ac9edfac588782831bdf-87",
                "reason": null,
                "weight": 589949957653325200
            },
            {
                "choice": "FOR",
                "id": "0x4d9ba778b7f121e58e5d3bb6aef514e035a7c7f5-87",
                "reason": null,
                "weight": 1134628983244555800
            },
            {
                "choice": "FOR",
                "id": "0x4dd7fc3a3b6457d1e67e3b046b2b0d2dcf25257d-87",
                "reason": null,
                "weight": 3742093716218786000
            },
            {
                "choice": "FOR",
                "id": "0x4ea94ec29ce986ee5a6e9c707471f9b4d6c3cc98-87",
                "reason": null,
                "weight": 140271806595612210
            },
            {
                "choice": "FOR",
                "id": "0x4fc53cdfb93fa69058529aa2caa174581e7fb541-87",
                "reason": null,
                "weight": 1111950387064342400
            },
            {
                "choice": "FOR",
                "id": "0x51f7b9630c80a3f64d2d9aba9371e1648e38a845-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x52e7d2dcd4c0599b91f74572cfa290197683de53-87",
                "reason": null,
                "weight": 200544178581975740
            },
            {
                "choice": "FOR",
                "id": "0x53da33f96ecffe1cdf3842883c9ba3ba3b49c14b-87",
                "reason": null,
                "weight": 374907017282231700
            },
            {
                "choice": "FOR",
                "id": "0x553f674dd7d102ad79c644103974a1cc53b62ac2-87",
                "reason": null,
                "weight": 5010542426220043000000000
            },
            {
                "choice": "FOR",
                "id": "0x555819a0e756f7bda6194715d0ff1f102b886818-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5732fd69ededa743ac78d2f3a1d1ea30ff67d82d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5769b60588a7c0e9ba18f1f7d31b0190158a65d9-87",
                "reason": null,
                "weight": 5422000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x5a4b09693ccaa2c3218592d0bafa7788a01f4600-87",
                "reason": null,
                "weight": 2574327540036073000
            },
            {
                "choice": "FOR",
                "id": "0x5aa3b5b86f2b0b8921a7dd35ce7d53787849bc3c-87",
                "reason": null,
                "weight": 142930007622412700
            },
            {
                "choice": "FOR",
                "id": "0x5b5e5ef95fbe5e658a206f1985f4742ffe0c9bbc-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5c04e7808455ee0e22c2773328c151d0dd79dc62-87",
                "reason": null,
                "weight": 20288536345699600000000
            },
            {
                "choice": "FOR",
                "id": "0x5c611e7f1669a0bfc5eafd56aa5de991345870d9-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5d113311965486a282f6fdb294d230b649c7978a-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5eb935297f624ad2ce394b4554fedbbb9fb8de53-87",
                "reason": null,
                "weight": 113405361871237390
            },
            {
                "choice": "FOR",
                "id": "0x5f9a57a31ca7b7fe6480dbe44a876d9d6111c039-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x61052ff7aa4694b81bbfecc45dccba38c4d9caa3-87",
                "reason": null,
                "weight": 335096553593924540
            },
            {
                "choice": "FOR",
                "id": "0x61ff9cbe2d6ce98f4c8ecf3807339474f4c09630-87",
                "reason": null,
                "weight": 1110000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x62d555af00e34fb060b3dcf37ba907e1d666ee58-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x639c85b7fc690fbd4e756beb4d4b72855d332fe9-87",
                "reason": null,
                "weight": 143365538611126030
            },
            {
                "choice": "FOR",
                "id": "0x66aa8bee5366b6b48811ae0dac9fe5e1eefe1621-87",
                "reason": null,
                "weight": 2500247840838060300000000
            },
            {
                "choice": "FOR",
                "id": "0x67d37b7817f00e5a471ec338db15093e86992a3c-87",
                "reason": null,
                "weight": 140657205917093660
            },
            {
                "choice": "FOR",
                "id": "0x683a4f9915d6216f73d6df50151725036bd26c02-87",
                "reason": null,
                "weight": 5252370992879855000000000
            },
            {
                "choice": "FOR",
                "id": "0x68c91b528b0a6f245258f4cff8c6fe7fdf0b88b4-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x6b3b656699f70ba16c972bf93385201d9aee4115-87",
                "reason": null,
                "weight": 124287438581112240
            },
            {
                "choice": "FOR",
                "id": "0x6d2d784c6d0a84ee9dd9a728675ffd80623710a8-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x6de8448e7d5f58af394cc9540abe703d0c955dfd-87",
                "reason": "https://gov.uniswap.org/t/proxy-prev-boardroom-delegate-platform/25385/12",
                "weight": 4605350580866312000
            },
            {
                "choice": "FOR",
                "id": "0x6f5cb87685ffe90e9793375353d35e8473407716-87",
                "reason": null,
                "weight": 155169933378558500
            },
            {
                "choice": "AGAINST",
                "id": "0x6f9bb7e454f5b3eb2310343f0e99269dc2bb8a1d-87",
                "reason": null,
                "weight": 2999766493207432500000
            },
            {
                "choice": "FOR",
                "id": "0x7241d0cbf9d4010e695842876d457e8c4c89716f-87",
                "reason": null,
                "weight": 154623472801399040
            },
            {
                "choice": "FOR",
                "id": "0x72b4b2553b2a6c17b558e628ff5b6b7141a68658-87",
                "reason": null,
                "weight": 10762956274627004
            },
            {
                "choice": "FOR",
                "id": "0x72b4e8f8c4a20a3329b864a671a55601cd34fdd3-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x7678ae25eb2059e2371255f19d8cde683d5d81c8-87",
                "reason": null,
                "weight": 1058961550784107900
            },
            {
                "choice": "FOR",
                "id": "0x767b0ada9bf5c622e261447e4bb6c2c48a2acec6-87",
                "reason": null,
                "weight": 162789609234923330
            },
            {
                "choice": "FOR",
                "id": "0x768e4afbb8e8a8252aca1d35b6b2537e3df3caa4-87",
                "reason": null,
                "weight": 1002335369085796400
            },
            {
                "choice": "FOR",
                "id": "0x779f1e5be083cceb662e374cdeeb2980dd2f28e2-87",
                "reason": null,
                "weight": 202763960300194850
            },
            {
                "choice": "FOR",
                "id": "0x7850e664f6982a5ccb682aa032ade55695b45b9d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x78bdef852cb0433e9b88131abaafe60216e3468d-87",
                "reason": null,
                "weight": 170345966891540380
            },
            {
                "choice": "FOR",
                "id": "0x7ae109a63ff4dc852e063a673b40bed85d22e585-87",
                "reason": null,
                "weight": 1250297080000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x7bb9dccc97052ddef05141897fe8313fd4ad0418-87",
                "reason": null,
                "weight": 16585224809275220000
            },
            {
                "choice": "FOR",
                "id": "0x7ec9572e8717a05425f8415c41cffca23e3044ce-87",
                "reason": null,
                "weight": 167699312907921570
            },
            {
                "choice": "FOR",
                "id": "0x80db00996d7a86c5c238ae8e35e5d3d6f4692e8d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8108bf9834b26e6272823437324caeaab8aae99d-87",
                "reason": null,
                "weight": 1652537757465360000
            },
            {
                "choice": "FOR",
                "id": "0x8178e58b1eeea0839b869af8da0de2bef5688c5b-87",
                "reason": null,
                "weight": 48483001515903340000
            },
            {
                "choice": "FOR",
                "id": "0x81bcc6a163a5fe2562308e51acb2a5a6d90dea71-87",
                "reason": "ankanairdrop",
                "weight": 2200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x82d0fadc82367e362babeda948f057a5cd25cd25-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x83a679cdb257913fa09ae4f4757dd22aa03a516b-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x84698c0b87691eebbb4a11ab20c49916e0d7ecd9-87",
                "reason": null,
                "weight": 144547868929571300
            },
            {
                "choice": "FOR",
                "id": "0x8521d201de08630de15483c723cfc872d3bd2a38-87",
                "reason": null,
                "weight": 184601163092172670
            },
            {
                "choice": "FOR",
                "id": "0x86894f895747047e55c66b991b9a08293877e129-87",
                "reason": null,
                "weight": 163040127707720580
            },
            {
                "choice": "ABSTAIN",
                "id": "0x8787fc2de4de95c53e5e3a4e5459247d9773ea52-87",
                "reason": null,
                "weight": 1461322083093583000000000
            },
            {
                "choice": "ABSTAIN",
                "id": "0x894b7d014019019bf29f7677caea6cd61597ecae-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8a7311f71bc2c164c88af91e1c1ead46c0126582-87",
                "reason": null,
                "weight": 203754212623104030
            },
            {
                "choice": "FOR",
                "id": "0x8abfdd1563ca17eb9b180ac271f05d5dd035441a-87",
                "reason": null,
                "weight": 2200000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x8ba927d2e467b0f1686f01cb2f6e029790d78144-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8c98c5cdf17ca4db1b2b322adbebea50d55f0fd6-87",
                "reason": null,
                "weight": 149650760789938240
            },
            {
                "choice": "FOR",
                "id": "0x8d1509e0240eba23cccd58941fa2b5d7ff1fc70f-87",
                "reason": "ready for season 4",
                "weight": 1019922754705676500
            },
            {
                "choice": "FOR",
                "id": "0x8fcdbbafae57f48387abd2272c71d18f33287933-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x909cc7e298a0a3920131cbea25a1267af724dedc-87",
                "reason": null,
                "weight": 194424443180759230
            },
            {
                "choice": "FOR",
                "id": "0x90a997e64bbe3221ee1ebb4e70e2d72c1eac4a7f-87",
                "reason": null,
                "weight": 500000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x90df6c57bdd4f9c21b54a37b1596d8b28214a1f8-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x913d97ea3f35f5e7426495c32fab629c703b2a26-87",
                "reason": null,
                "weight": 111300308164878720
            },
            {
                "choice": "ABSTAIN",
                "id": "0x9588b068b14e6397bb47ad3763f9fb5e2f7d7cae-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x95c5593e13b1b57e472dbdcabf813b73d04cfd13-87",
                "reason": null,
                "weight": 133333961262280980
            },
            {
                "choice": "FOR",
                "id": "0x9711acd9991751889ebf01988c94ca651eec0dfd-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0x97b7a1f3a166ed11dd487837476286c2dc1c7591-87",
                "reason": null,
                "weight": 123995499199726850
            },
            {
                "choice": "ABSTAIN",
                "id": "0x9881e5023c0c46c32b6c2d20001fdd132f05a7c5-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x996074125acb52c94d391b05a520e0c45fb4b4e5-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x9a0f21b00d45856bf67be52d822fa3d4f8888de8-87",
                "reason": null,
                "weight": 1227444092654563800
            },
            {
                "choice": "FOR",
                "id": "0x9b5f2f8231ca61f1408d41f8f0fb352069ea9ee1-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x9bc170c20229d26252703c27030d2b535dfa50dd-87",
                "reason": null,
                "weight": 136837888317710770
            },
            {
                "choice": "AGAINST",
                "id": "0x9e41b73693c664d81a2ed418dba2193417783054-87",
                "reason": null,
                "weight": 113882684120971200
            },
            {
                "choice": "FOR",
                "id": "0x9efd2eeabcc202ea692fb36b9eb1635ba15095ba-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xa0657098780eafe57b10e9ae9c838e30c83d4f79-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "ABSTAIN",
                "id": "0xa1a058a4b7f9a4980541ec70e8af94f334540de0-87",
                "reason": null,
                "weight": 123962606986649630
            },
            {
                "choice": "FOR",
                "id": "0xa2538488098e73528e5d1bb7ccb5711a6453458f-87",
                "reason": null,
                "weight": 191120087596487840
            },
            {
                "choice": "FOR",
                "id": "0xa652c2c693d0cee3c1cd1ac799c1a5ccd9cb8f9f-87",
                "reason": null,
                "weight": 415290639227938100
            },
            {
                "choice": "FOR",
                "id": "0xa683b832f8406a119600339381541f46095e3c72-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xa6854188a73ccbbdefd44711d3599b14e6a281db-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xa6e8772af29b29b9202a073f8e36f447689beef6-87",
                "reason": null,
                "weight": 2501290264423367300000000
            },
            {
                "choice": "FOR",
                "id": "0xa744d928a9c1ca6849e39db9adcfcd689f325714-87",
                "reason": null,
                "weight": 378889601103316030
            },
            {
                "choice": "FOR",
                "id": "0xa8293dd8eb52564a35b8357a539146321b934153-87",
                "reason": null,
                "weight": 32941026986416714000
            },
            {
                "choice": "FOR",
                "id": "0xa8d3a2c3e191306e7544e5fb7130a6c0eee2360b-87",
                "reason": null,
                "weight": 135538616002496540
            },
            {
                "choice": "FOR",
                "id": "0xa8e17be2b11e744561859c9c31ea060ee30bf37c-87",
                "reason": null,
                "weight": 9485005354442732
            },
            {
                "choice": "FOR",
                "id": "0xa8ec567d5384070cf1b52a79690fe8407ad18698-87",
                "reason": null,
                "weight": 3609377036715782700
            },
            {
                "choice": "FOR",
                "id": "0xa8f9a01cfd68426d041d0d2c8b55b045749f7ac0-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "ABSTAIN",
                "id": "0xa987e15c7df53b4c44009f2b3c8b02dda9e4e640-87",
                "reason": null,
                "weight": 110842300155799970
            },
            {
                "choice": "FOR",
                "id": "0xaa30037cdd4aa927a3b4df9065e662ebd73a2f53-87",
                "reason": null,
                "weight": 3434587510437592000
            },
            {
                "choice": "FOR",
                "id": "0xaac35d953ef23ae2e61a866ab93dea6ec0050bcd-87",
                "reason": null,
                "weight": 406623649978093500000000
            },
            {
                "choice": "FOR",
                "id": "0xadd2f9a2c8b74cfb1b8e8fd563531a46b86a8995-87",
                "reason": null,
                "weight": 432598688070882900
            },
            {
                "choice": "FOR",
                "id": "0xae80000916925cf8770039959ba7eee0638b31d9-87",
                "reason": null,
                "weight": 113761501446648290
            },
            {
                "choice": "FOR",
                "id": "0xaed7b009d0225f3968d5daf295f259545a07e62c-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xaf05b88ac16ad3272d7ade699db51d03c4ff9f91-87",
                "reason": null,
                "weight": 338882697840930800
            },
            {
                "choice": "FOR",
                "id": "0xb3313b023e68cda95d7b625200e1b0fe6335a0c2-87",
                "reason": null,
                "weight": 33054824272283374000
            },
            {
                "choice": "FOR",
                "id": "0xb331abd0e1e1b6c3ddd2cedf95c19b6a0fba7174-87",
                "reason": null,
                "weight": 115752800953089580
            },
            {
                "choice": "FOR",
                "id": "0xb35659cbac913d5e4119f2af47fd490a45e2c826-87",
                "reason": "The Event Horizon Community voted FOR on this Proposal (ehUNI-56): EventHorizon.vote/vote/uniswap/ehUNI-56",
                "weight": 9055058715122288000000
            },
            {
                "choice": "FOR",
                "id": "0xb49f8b8613be240213c1827e2e576044ffec7948-87",
                "reason": null,
                "weight": 2500597954562634000000000
            },
            {
                "choice": "FOR",
                "id": "0xb5ea7ce98dbd885f71360309831958c2e3faa037-87",
                "reason": null,
                "weight": 146805359051496800
            },
            {
                "choice": "FOR",
                "id": "0xb7771f70633c7e54e61dd38d01c26da0e86be1a5-87",
                "reason": null,
                "weight": 1003761601952090000000000
            },
            {
                "choice": "FOR",
                "id": "0xb79294d00848a3a4c00c22d9367f19b4280689d7-87",
                "reason": null,
                "weight": 4794544884010002000000
            },
            {
                "choice": "FOR",
                "id": "0xb83405aaee2a54a08022403939736bf5b33510e1-87",
                "reason": null,
                "weight": 22662122720000000000
            },
            {
                "choice": "FOR",
                "id": "0xb8c7c87ad9d86876e0874c6c0eb28cd6c931e75e-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb933aee47c438f22de0747d57fc239fe37878dd1-87",
                "reason": null,
                "weight": 2747007573374473000000000
            },
            {
                "choice": "FOR",
                "id": "0xb986f24a3658b5ee7dd5885c32c7c4ad7b982175-87",
                "reason": null,
                "weight": 134173659865504320
            },
            {
                "choice": "FOR",
                "id": "0xbbcab2d46b4d7903a5c1bc0d69b1f6efc604ca1a-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xbe6e0481e9fce3145977da0fa41d10269138d2a6-87",
                "reason": null,
                "weight": 231215451923729600
            },
            {
                "choice": "FOR",
                "id": "0xbec643bd5b7f5e9190617ca4187ef0455950c51c-87",
                "reason": null,
                "weight": 5000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xbf477b0e6419630e2cd8f33905fe76538686e812-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc0630766b1a2f0f3df022573ecb32150c4d56811-87",
                "reason": null,
                "weight": 18330920221221876000000
            },
            {
                "choice": "FOR",
                "id": "0xc08314d6e1e1cff0787a51a12f7eeb8ff9921edc-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc1e8bcd06f0336bdae77bafe980d6c67c07ebb3c-87",
                "reason": null,
                "weight": 195265793024288540
            },
            {
                "choice": "FOR",
                "id": "0xc2cb4442a5e7046ac28fad475feced67eec7f660-87",
                "reason": null,
                "weight": 1300000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc6d7208dadee4f431bd0f3f11e7d4c91ff51bfb2-87",
                "reason": null,
                "weight": 1111000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc75d1d06f66556963bfc7648605a719793182391-87",
                "reason": null,
                "weight": 700000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc7633c8da4783ed7f08802dea2c0eebaedd40010-87",
                "reason": null,
                "weight": 137915824558149360
            },
            {
                "choice": "FOR",
                "id": "0xc86007eb68402ba90cb2ffbac7abe8e9dcec8d3a-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc99d90c0a037f5cd856cfc78172ce70ae8143fb4-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc9ff715ff5fde21a10c8054085a756ce098fe896-87",
                "reason": null,
                "weight": 204892750941943550
            },
            {
                "choice": "FOR",
                "id": "0xca4157455a6e4fa063cc17389e44ed4d18cf9324-87",
                "reason": null,
                "weight": 112986996122673700
            },
            {
                "choice": "AGAINST",
                "id": "0xccfcdf6fb169c7dc94dc2b1880271b99c16544a2-87",
                "reason": null,
                "weight": 207214596109569730
            },
            {
                "choice": "FOR",
                "id": "0xd0764b363ea9f5725ee6d7c3d3ac292e40c56872-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd14055e0cdf9236d31481a7a73469a013e5da06c-87",
                "reason": null,
                "weight": 223844390310339740
            },
            {
                "choice": "FOR",
                "id": "0xd2602c7bdfc9f413974e944280bbfae275d1b1b6-87",
                "reason": null,
                "weight": 1069979970235306100
            },
            {
                "choice": "FOR",
                "id": "0xd2f931fbaaa5b39f14c147f843bbf1a13186399c-87",
                "reason": null,
                "weight": 526956003379285600
            },
            {
                "choice": "FOR",
                "id": "0xd368cfd095fdc0452dd7c4fde1770c0b55b9bb1a-87",
                "reason": null,
                "weight": 113602378650263650
            },
            {
                "choice": "FOR",
                "id": "0xd36c4d7fe90cf6c9c1c7363d070eae46e657a23f-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0xd4cc75f5d38e1eb65fb1c7665aa8682ff2a02140-87",
                "reason": null,
                "weight": 99324912497700420
            },
            {
                "choice": "FOR",
                "id": "0xd5cbf38d614f6555e2327ace6a33a8856ab5b69d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd6365f8efa0039923983355ee12b1d0694e7b468-87",
                "reason": null,
                "weight": 143508161248131460
            },
            {
                "choice": "FOR",
                "id": "0xd6368d2e97695a30678e5ec2668f23c05320522e-87",
                "reason": null,
                "weight": 142817244572586910
            },
            {
                "choice": "ABSTAIN",
                "id": "0xd67cb3bdcc300f10dd25fb62dadb8c9242f0d5b7-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd6b8d0e159b29074a5df734e590c9010a0069b80-87",
                "reason": null,
                "weight": 2031686506419111400
            },
            {
                "choice": "FOR",
                "id": "0xd8dea87ddcc0c3c1464ded6102e4d3e829d0ae41-87",
                "reason": null,
                "weight": 1657313873315690000
            },
            {
                "choice": "FOR",
                "id": "0xd912308af7b7bdad857587e95aafa0cb1816f85f-87",
                "reason": null,
                "weight": 128137422769834030
            },
            {
                "choice": "FOR",
                "id": "0xd9995dabb781dcc8ec408fea5f293712febf17db-87",
                "reason": null,
                "weight": 159693942462662200
            },
            {
                "choice": "FOR",
                "id": "0xda4682c01671c39735f04b9d8e0cce025238c528-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xdba2edfa107199560a5dafb174dedc1bc0c423f8-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xdc1f98682f4f8a5c6d54f345f448437b83f5e432-87",
                "reason": null,
                "weight": 2500000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xdcb8e5aa4cc53960bdf462ad62c85414b3dcce6a-87",
                "reason": null,
                "weight": 1275624613718212400
            },
            {
                "choice": "FOR",
                "id": "0xdcf8d6469c9e8cd1fd5b039deb538991db59a244-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xdd4098207af1d675b690053f0057a5d97d8b1c88-87",
                "reason": null,
                "weight": 229507855318600260
            },
            {
                "choice": "FOR",
                "id": "0xe10a296a7235ac9d278e87d5837aae318823390f-87",
                "reason": null,
                "weight": 100871071585239070
            },
            {
                "choice": "FOR",
                "id": "0xe22817a91a14d61cb3691954983663425f5513b1-87",
                "reason": null,
                "weight": 187110153155401500000
            },
            {
                "choice": "FOR",
                "id": "0xe5bde866b2dd33a2aec4c2ca2dd446a084397091-87",
                "reason": null,
                "weight": 150047389746581860
            },
            {
                "choice": "FOR",
                "id": "0xe68563eac15fe5ea39399f414137f78a31273acf-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xe6fd1a77021ab0c22a25382a07841e30dcd38df5-87",
                "reason": null,
                "weight": 222099277070488740
            },
            {
                "choice": "FOR",
                "id": "0xe93d59cc0bcecfd4ac204827ef67c5266079e2b5-87",
                "reason": null,
                "weight": 2500654380783741000000000
            },
            {
                "choice": "FOR",
                "id": "0xec08723845698a885ffc38385c1f3afef3da0ae0-87",
                "reason": null,
                "weight": 222961597562935580
            },
            {
                "choice": "FOR",
                "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9-87",
                "reason": null,
                "weight": 2503920676298366000000000
            },
            {
                "choice": "FOR",
                "id": "0xed11e5ea95a5a3440fbaadc4cc404c56d0a5bb04-87",
                "reason": null,
                "weight": 2500965718297016000000000
            },
            {
                "choice": "FOR",
                "id": "0xeed5f0be001b99aa1dcb6deda68a4b2b0de1d425-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xefa9524ac8703db3a172c605210936a15ec166b1-87",
                "reason": null,
                "weight": 160181575086488420
            },
            {
                "choice": "FOR",
                "id": "0xefdb9ba6b79e76f9e2bf937bba861fe110143c77-87",
                "reason": null,
                "weight": 7913043957022792000
            },
            {
                "choice": "FOR",
                "id": "0xf070cd4b5ba73a6b6a939dde513f79862bffcd25-87",
                "reason": null,
                "weight": 14942500000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf1877ddcdd6458529abfa77c522b441811bb9f94-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xf2ee696b1a937c3a4db8201a1c5305eb51911a9d-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xf51754d95c0b9bb416ab4915e9f10b04d04d29e5-87",
                "reason": null,
                "weight": 3824194520647374000
            },
            {
                "choice": "FOR",
                "id": "0xf6a0d4088824a5f5cb80d379a8ec462643e47a3b-87",
                "reason": null,
                "weight": 114590666462885280
            },
            {
                "choice": "FOR",
                "id": "0xf6dc93dcaa16b1d48eb9929b9a8830331c89963a-87",
                "reason": null,
                "weight": 198740861399058800
            },
            {
                "choice": "FOR",
                "id": "0xf857c7e5c41d49b7f68a612f7289890a703162e4-87",
                "reason": null,
                "weight": 160828720848196540
            },
            {
                "choice": "FOR",
                "id": "0xf9551c66995ed3ff9bb05c9fd7ff148bd75dc99a-87",
                "reason": null,
                "weight": 250011547134276450000000
            },
            {
                "choice": "AGAINST",
                "id": "0xf96cfed3897381c92f6deb95f06d4da5b5b2998f-87",
                "reason": null,
                "weight": 133645718527634200
            },
            {
                "choice": "FOR",
                "id": "0xfb0f0c37a3452c6a4a2a7d45d453a391b305fe5a-87",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xfd52fb43fec22181294482c5c0cdfc7a621884ae-87",
                "reason": null,
                "weight": 145137443477582460
            },
            {
                "choice": "FOR",
                "id": "0xfd7f25a9a5404223fe7d5bf5f9547b0108961760-87",
                "reason": null,
                "weight": 140594134579778290
            },
            {
                "choice": "FOR",
                "id": "0xff71447b5f1eb39b502eca9783cd5ddaf6b7b3eb-87",
                "reason": null,
                "weight": 137806763623960850
            },
            {
                "choice": "FOR",
                "id": "0xfffd05ae9db4d5f4e23e2f37395db2f87359bf5d-87",
                "reason": null,
                "weight": 5495994997649237000
            }
        ]
    },
    {
        "abstain_delegate_votes": null,
        "against_delegate_votes": null,
        "creation_time": null,
        "description": "Should Uniswap v3 be deployed to Polygon? \\nGFX Labs is submitting Polygon's governance proposal to deploy Uniswap v3 to Polygon on their behalf. \\n\\nThe [consensus check](https://snapshot.org/#/uniswap/proposal/0xe869bc63ed483f00c520129724934a206b433dec613a498100e25f9f10fbeac7) passed with 44M (98.87%) YES votes and 500k (1.13%) NO votes. \\n\\nThe [temperature check](https://snapshot.org/#/uniswap/proposal/0x47a6eed75673f33e8eb5d7abbfc0279d8c113ec7fa51f8b61c1abcd66dc091c6) passed with 7.79M (~100%) YES votes and 101 (~0%) NO votes. \\n\\nThe full proposal can be found [here](https://gov.uniswap.org/t/deploy-uniswap-v3-to-polygon-pos-chain/15058?u=getty).\\n\\n## Summary\\nThe Polygon team proposes to authorize Uniswap Labs to deploy Uniswap protocol to Polygon PoS on behalf of the community.\\n\\nWe believe this is the right moment for Uniswap to deploy on Polygon, for several major reasons:\\n\\n* Polygon PoS has the second strongest DeFi ecosystem, right after Ethereum L1;\\n* Deploying to Polygon PoS can bring a lot of benefits (user base growth, huge savings for users, higher user activity, higher revenue, market capture, return to the original DeFi vision etc);\\n* We are willing to incentivize Uniswap adoption, financially and otherwise;\\n* Polygon PoS is battle-tested;\\n* Polygon is aligned with Ethereum and its values.\\n\\nWe respectfully submit this proposal for your consideration, and we are looking forward to your questions and feedback.\\n\\nWe would be willing to commit up to $20M for the aforementioned financial incentives, and we propose to use these funds in the following way: \\n* Up to $15M for a long-term liquidity mining campaign;\\n* Up to $5M towards the overall adoption of Uniswap on Polygon. \\n\\nIn addition to the financial incentives we are offering will also be supporting the integration by: \\n*  Actively participate in the design and execution of liquidity mining campaigns;\\n*  Work with prominent projects in the Polygon DeFi ecosystem to help them understand the benefits of using Uniswap V3 as a “money lego.”\\n*  Promote Uniswap as a “money lego” on hackathons and other developer-focused events and efforts etc.\\n\\n## On-chain voting\\n\\nThis proposal has no on-chain functionality other than polling all Uniswap holders. Although the proposal already exceeded the 40m quorum threshold during the consensus check, the Uniswap community feels it is important to allow all UNI holders the opportunity to cast a vote. One important argument in favor of this decision is that Snapshot is not supported by custody providers like Coinbase, Anchorage, etc., smart contract wallets like Argent/Gnosis safe, or meta governance layers like Index & Compound. \\n\\nGovernor Bravo requires at least one on-chain action, so the proposal includes a transfer of 0 UNI to satisfy the requirement.\\n\\nIf the proposal passes this phase, the Uniswap Labs can deploy Uniswap on Polygon on behalf of the Uniswap community.",
        "for_delegate_votes": null,
        "id": "10",
        "proposer": {
            "delegated_votes_raw": null,
            "id": "0x9b68c14e936104e9a7a24c712beecdc220002984",
            "number_votes": null,
            "token_holders_represented_amount": null
        },
        "quorum_votes": null,
        "state": "ACTIVE",
        "total_delegate_votes": null,
        "votes": [
            {
                "choice": "FOR",
                "id": "0x000a99532e11ad7b06c26ceade3655ed64f68467-86",
                "reason": null,
                "weight": 158256728132025730
            },
            {
                "choice": "FOR",
                "id": "0x00db9d455404b9288a453ac90f6d8ead51f2e32c-86",
                "reason": null,
                "weight": 178134321607394020
            },
            {
                "choice": "FOR",
                "id": "0x0100e22f222753f6021abeb3f7e4af4c57467cc9-86",
                "reason": null,
                "weight": 4707658469842507000
            },
            {
                "choice": "FOR",
                "id": "0x015122a625b45f68e6d795c0ab99fc7107e4c3b9-86",
                "reason": null,
                "weight": 4360000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x019ed608dd806b80193942f2a960e7ac8abb2ee3-86",
                "reason": null,
                "weight": 21918767330923577000
            },
            {
                "choice": "FOR",
                "id": "0x026ff7f1767ad7b133fe456fd6e4f72e20f49389-86",
                "reason": null,
                "weight": 158478693265585440
            },
            {
                "choice": "FOR",
                "id": "0x057928bc52bd08e4d7ce24bf47e01ce99e074048-86",
                "reason": "This rebalance ensures DAO program commitments remain fully funded despite UNI price fluctuations, maintaining financial continuity and accountability for ongoing initiatives as budgeted in dollar terms.",
                "weight": 2684200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x0579a616689f7ed748dc07692a3f150d44b0ca09-86",
                "reason": null,
                "weight": 101476005146459770000
            },
            {
                "choice": "FOR",
                "id": "0x070341aa5ed571f0fb2c4a5641409b1a46b4961b-86",
                "reason": null,
                "weight": 3001101135096709500000000
            },
            {
                "choice": "FOR",
                "id": "0x0940e77c7a784c65a9726b7a4e6852c7e05276cc-86",
                "reason": null,
                "weight": 2209237684148285700
            },
            {
                "choice": "ABSTAIN",
                "id": "0x09aded8f4ee5ef59217ac4e23fd00335e305b267-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x09cf30aaedeb144c6caf6f135d4582945b4191b7-86",
                "reason": null,
                "weight": 191639266252164100
            },
            {
                "choice": "FOR",
                "id": "0x0a0f04a231efbc29e1db7d086300ff550211c2f6-86",
                "reason": null,
                "weight": 46241847731945810000000
            },
            {
                "choice": "FOR",
                "id": "0x0bef930f5a00d075915eb6d3b13d73fde553edf6-86",
                "reason": null,
                "weight": 128111285603519600
            },
            {
                "choice": "FOR",
                "id": "0x104c5d4c8a2439732735eac71b8abf84d74f8cd3-86",
                "reason": null,
                "weight": 141490824344265730
            },
            {
                "choice": "FOR",
                "id": "0x11069c08dd30aa4c17d73b0e3984a433a0e39fda-86",
                "reason": null,
                "weight": 402925517216111460000
            },
            {
                "choice": "FOR",
                "id": "0x12b30979b9a53bb0b42deaaa974ac9304fab0832-86",
                "reason": "https://gov.uniswap.org/t/seedgov-delegate-platform/23987/54",
                "weight": 1999965720490000000000
            },
            {
                "choice": "AGAINST",
                "id": "0x134d35266e9075adc311182938f5f9083df6b65c-86",
                "reason": null,
                "weight": 194623777299749500
            },
            {
                "choice": "FOR",
                "id": "0x1384e4bc3ae7104ccb9e3c5d3e4acda7235f00d8-86",
                "reason": null,
                "weight": 1684137300687418400
            },
            {
                "choice": "FOR",
                "id": "0x13bdae8c5f0fc40231f0e6a4ad70196f59138548-86",
                "reason": null,
                "weight": 3862039844466877000000000
            },
            {
                "choice": "FOR",
                "id": "0x147bfb68baa25b70d0fc1931a4b4941c7f60ff2e-86",
                "reason": null,
                "weight": 135546009630528140
            },
            {
                "choice": "FOR",
                "id": "0x155e9d7f9add12ad8c051dd0dc3c39494618af8c-86",
                "reason": null,
                "weight": 136805762546403580
            },
            {
                "choice": "FOR",
                "id": "0x168620f57dcbcd5d9ac84e5ca3c2ec753bd60c88-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x17296956b4e07ff8931e4ff4ea06709fab70b879-86",
                "reason": null,
                "weight": 7001000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x1824a96fcc37a8d21703b38ff242fafcc388b75e-86",
                "reason": null,
                "weight": 284290568351731940
            },
            {
                "choice": "FOR",
                "id": "0x182fcf35d9065375c0c74fccb13dffe912ca83b3-86",
                "reason": null,
                "weight": 459179480000000000000
            },
            {
                "choice": "FOR",
                "id": "0x19acb89cb4bd36f6e471c91585b95b966d33132e-86",
                "reason": null,
                "weight": 5808249186923794000
            },
            {
                "choice": "FOR",
                "id": "0x1a7971e6257b5259f3a781c435de2905b21af2d0-86",
                "reason": null,
                "weight": 101446996351582450
            },
            {
                "choice": "FOR",
                "id": "0x1a9ab967c5672622c55023ea2fcb892e60da2e4a-86",
                "reason": null,
                "weight": 3742226664652157000
            },
            {
                "choice": "FOR",
                "id": "0x1af4d658f73dfd69cb5ec35aa27ae6308998f248-86",
                "reason": null,
                "weight": 117244706542478720
            },
            {
                "choice": "FOR",
                "id": "0x1b686ee8e31c5959d9f5bbd8122a58682788eead-86",
                "reason": null,
                "weight": 259669906039192030000000
            },
            {
                "choice": "FOR",
                "id": "0x1c05decb151a459e8b045a93f472d1b238204094-86",
                "reason": null,
                "weight": 268137336166465950
            },
            {
                "choice": "FOR",
                "id": "0x1d1a7b1ca3c1b326d742bad93dce27fba380a0ac-86",
                "reason": null,
                "weight": 113633886653918260
            },
            {
                "choice": "FOR",
                "id": "0x1e7e8409cc2d3d53555bfa973c4fe0160b6a65d4-86",
                "reason": null,
                "weight": 118816310460019170
            },
            {
                "choice": "FOR",
                "id": "0x1f3d3a7a9c548be39539b39d7400302753e20591-86",
                "reason": null,
                "weight": 1000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x20330d6ebf42f9adf1f49ee3e6835ee5bf4ac744-86",
                "reason": null,
                "weight": 177188152755470100
            },
            {
                "choice": "FOR",
                "id": "0x211d158941829c694060b6016d69c4568cd4a771-86",
                "reason": null,
                "weight": 234952616191391650
            },
            {
                "choice": "FOR",
                "id": "0x21b3b193b71680e2fafe40768c03a0fd305efa75-86",
                "reason": null,
                "weight": 29000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x22ff9a5afa2b3e294154c561342c04f6293ccc99-86",
                "reason": null,
                "weight": 123596387705310640
            },
            {
                "choice": "FOR",
                "id": "0x274829c52bba894d62a4931b46b76cfe0606ac26-86",
                "reason": null,
                "weight": 4271179400000000000
            },
            {
                "choice": "FOR",
                "id": "0x282951b4acaf21ca7574a9c59650cee2d51508b3-86",
                "reason": null,
                "weight": 127205759363956900
            },
            {
                "choice": "FOR",
                "id": "0x283cd25ecc18cf51d7b91c68f30462c9efafd33d-86",
                "reason": null,
                "weight": 62837592574643780
            },
            {
                "choice": "FOR",
                "id": "0x29ba1cd172e481ee77ccdc57dc17402a4f101777-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "ABSTAIN",
                "id": "0x2ad89b2ae3e390d24f6af09bf0aeb94756dcdbdc-86",
                "reason": null,
                "weight": 206092682521002140
            },
            {
                "choice": "FOR",
                "id": "0x2bff0d5bc65b920806a50c5e27b879b05a6538ae-86",
                "reason": null,
                "weight": 130370993860371660
            },
            {
                "choice": "FOR",
                "id": "0x2f1cbb5ef7c05e92a24a15a564069ea486266e73-86",
                "reason": null,
                "weight": 418543456016042000
            },
            {
                "choice": "FOR",
                "id": "0x2f2f665974261c4129b1dc6c359bd259cd66f78a-86",
                "reason": null,
                "weight": 11790309905263606000
            },
            {
                "choice": "FOR",
                "id": "0x319644b620eefc5ad0b5ea7906585828b31c4f33-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x32faeb79584659de53d1b165d00f11f3b4e44c93-86",
                "reason": null,
                "weight": 1185549793881505100000
            },
            {
                "choice": "FOR",
                "id": "0x33e8581f812585cd2f277b6e40c26f7d08a5f2a9-86",
                "reason": null,
                "weight": 143141026842418720
            },
            {
                "choice": "FOR",
                "id": "0x3511234945e71c792b053a6f1fb5458fb28691e6-86",
                "reason": null,
                "weight": 117963508863652510
            },
            {
                "choice": "FOR",
                "id": "0x3538a82e679b2d7b1ff5422cc5d50f14d9794ec6-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3630f939a35c52957143e7ad45f31ce486715416-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x36ba23241ff9ed173ac2c384d0e4760536d4b435-86",
                "reason": null,
                "weight": 140285177311208270
            },
            {
                "choice": "FOR",
                "id": "0x37b463feae69d547f7d9cc3ff4bcb309928bd54d-86",
                "reason": null,
                "weight": 3977381618159529500
            },
            {
                "choice": "FOR",
                "id": "0x37c8dc884b66a504607b75cdbdb30ad3fda93068-86",
                "reason": null,
                "weight": 1200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x3b1a9267ab7e6e2eb59f086baedd2ba8e6c01228-86",
                "reason": null,
                "weight": 1105907669366364900
            },
            {
                "choice": "FOR",
                "id": "0x3b3d96d7ba6d981ed0861e54d6298947b495f68f-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x3ddc7d25c7a1dc381443e491bbf1caa8928a05b0-86",
                "reason": null,
                "weight": 1076870215514875900000
            },
            {
                "choice": "FOR",
                "id": "0x3fb19771947072629c8eee7995a2ef23b72d4c8a-86",
                "reason": null,
                "weight": 2501686002425779000000000
            },
            {
                "choice": "FOR",
                "id": "0x405202c2686dae017b2c3dc917512fde0e06833b-86",
                "reason": null,
                "weight": 114831219910677420
            },
            {
                "choice": "FOR",
                "id": "0x406465d986136010dc132f9541c1b836b6fb2b8f-86",
                "reason": null,
                "weight": 118241483888337100
            },
            {
                "choice": "FOR",
                "id": "0x414c3dcae423ff2a5e88f2668585a1ce82dc64d0-86",
                "reason": null,
                "weight": 113545635677554020
            },
            {
                "choice": "ABSTAIN",
                "id": "0x418735fab2b5631355b8d136793bac69f400bc06-86",
                "reason": null,
                "weight": 5700000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x418e84552b0c09c393c1bb0742aec323ce21e0a4-86",
                "reason": null,
                "weight": 140163610153605020
            },
            {
                "choice": "FOR",
                "id": "0x42a9b82d35839c4760ceb82d848f0d1355bcf7e4-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x4417d2648aa1c276300052d7d3481ab24d3023f6-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x44424b581f8d2612ff603ae4e8c6e8746bd262d7-86",
                "reason": null,
                "weight": 181106967097929800
            },
            {
                "choice": "FOR",
                "id": "0x448b9b6c6863a2a2f56bf505dee2aec6be56f65c-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x463ba5667ac4aabd51e64f4f09963c81366bf3ac-86",
                "reason": null,
                "weight": 221029923718409860
            },
            {
                "choice": "FOR",
                "id": "0x477e89659cd4433dcb9cb8a9c607b73413a3238b-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x47994dbe2801152aa208465ca2b7553546795baa-86",
                "reason": null,
                "weight": 180084855665872200
            },
            {
                "choice": "FOR",
                "id": "0x47c0f3ec73c26dbcc6f49706a93fa9c100024659-86",
                "reason": null,
                "weight": 103188253736526700
            },
            {
                "choice": "FOR",
                "id": "0x47f3b28bcd2897a7daf275b0c233ae757d5ae359-86",
                "reason": null,
                "weight": 516935489609398700
            },
            {
                "choice": "FOR",
                "id": "0x491f0a51db8de30fe561704c31b1f39f177e9fbb-86",
                "reason": null,
                "weight": 133401487714990930
            },
            {
                "choice": "FOR",
                "id": "0x4cda9b3675d4df9966f9f772b7b1398a4b107053-86",
                "reason": null,
                "weight": 129985934217897300
            },
            {
                "choice": "FOR",
                "id": "0x4d32d90d6535bd4e7eabaa27ee72932cb214bbfa-86",
                "reason": null,
                "weight": 1000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x4d4ac65513fee380c596ac9edfac588782831bdf-86",
                "reason": null,
                "weight": 589949957653325200
            },
            {
                "choice": "FOR",
                "id": "0x4d9ba778b7f121e58e5d3bb6aef514e035a7c7f5-86",
                "reason": null,
                "weight": 1134628983244555800
            },
            {
                "choice": "FOR",
                "id": "0x4dd7fc3a3b6457d1e67e3b046b2b0d2dcf25257d-86",
                "reason": null,
                "weight": 3742093716218786000
            },
            {
                "choice": "FOR",
                "id": "0x4ea94ec29ce986ee5a6e9c707471f9b4d6c3cc98-86",
                "reason": null,
                "weight": 140271806595612210
            },
            {
                "choice": "FOR",
                "id": "0x4fc53cdfb93fa69058529aa2caa174581e7fb541-86",
                "reason": null,
                "weight": 1111950387064342400
            },
            {
                "choice": "FOR",
                "id": "0x52e7d2dcd4c0599b91f74572cfa290197683de53-86",
                "reason": null,
                "weight": 200544178581975740
            },
            {
                "choice": "FOR",
                "id": "0x53da33f96ecffe1cdf3842883c9ba3ba3b49c14b-86",
                "reason": null,
                "weight": 374907017282231700
            },
            {
                "choice": "FOR",
                "id": "0x553f674dd7d102ad79c644103974a1cc53b62ac2-86",
                "reason": null,
                "weight": 5010542426220043000000000
            },
            {
                "choice": "FOR",
                "id": "0x5732fd69ededa743ac78d2f3a1d1ea30ff67d82d-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5769b60588a7c0e9ba18f1f7d31b0190158a65d9-86",
                "reason": null,
                "weight": 5422000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x5a4b09693ccaa2c3218592d0bafa7788a01f4600-86",
                "reason": null,
                "weight": 2574327540036073000
            },
            {
                "choice": "FOR",
                "id": "0x5aa3b5b86f2b0b8921a7dd35ce7d53787849bc3c-86",
                "reason": null,
                "weight": 142930007622412700
            },
            {
                "choice": "FOR",
                "id": "0x5ba0b02778cef99d9fc4fff451132bcd144ae4f9-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x5c04e7808455ee0e22c2773328c151d0dd79dc62-86",
                "reason": null,
                "weight": 20288536345699600000000
            },
            {
                "choice": "FOR",
                "id": "0x5eb935297f624ad2ce394b4554fedbbb9fb8de53-86",
                "reason": null,
                "weight": 113405361871237390
            },
            {
                "choice": "FOR",
                "id": "0x61052ff7aa4694b81bbfecc45dccba38c4d9caa3-86",
                "reason": null,
                "weight": 335096553593924540
            },
            {
                "choice": "FOR",
                "id": "0x61ff9cbe2d6ce98f4c8ecf3807339474f4c09630-86",
                "reason": null,
                "weight": 1110000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x6208634a28e75213f30da42b9f8a959864911487-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0x639c85b7fc690fbd4e756beb4d4b72855d332fe9-86",
                "reason": null,
                "weight": 143365538611126030
            },
            {
                "choice": "FOR",
                "id": "0x66aa8bee5366b6b48811ae0dac9fe5e1eefe1621-86",
                "reason": null,
                "weight": 2500247840838060300000000
            },
            {
                "choice": "FOR",
                "id": "0x67d37b7817f00e5a471ec338db15093e86992a3c-86",
                "reason": null,
                "weight": 140657205917093660
            },
            {
                "choice": "FOR",
                "id": "0x683a4f9915d6216f73d6df50151725036bd26c02-86",
                "reason": null,
                "weight": 5252370992879855000000000
            },
            {
                "choice": "FOR",
                "id": "0x6b3b656699f70ba16c972bf93385201d9aee4115-86",
                "reason": null,
                "weight": 124287438581112240
            },
            {
                "choice": "FOR",
                "id": "0x6de1371ccadc34da27ed2b952ca2fb653cf10b2b-86",
                "reason": null,
                "weight": 419875631202566700
            },
            {
                "choice": "FOR",
                "id": "0x6de8448e7d5f58af394cc9540abe703d0c955dfd-86",
                "reason": "https://gov.uniswap.org/t/proxy-prev-boardroom-delegate-platform/25385/12",
                "weight": 4605350580866312000
            },
            {
                "choice": "FOR",
                "id": "0x6f4c4f146d91264b515b27b3461af7c370bfe79e-86",
                "reason": null,
                "weight": 243743470745740220
            },
            {
                "choice": "FOR",
                "id": "0x6f5cb87685ffe90e9793375353d35e8473407716-86",
                "reason": null,
                "weight": 155169933378558500
            },
            {
                "choice": "FOR",
                "id": "0x6f9bb7e454f5b3eb2310343f0e99269dc2bb8a1d-86",
                "reason": null,
                "weight": 2999766493207432500000
            },
            {
                "choice": "FOR",
                "id": "0x7241d0cbf9d4010e695842876d457e8c4c89716f-86",
                "reason": null,
                "weight": 154623472801399040
            },
            {
                "choice": "FOR",
                "id": "0x72b4b2553b2a6c17b558e628ff5b6b7141a68658-86",
                "reason": null,
                "weight": 10762956274627004
            },
            {
                "choice": "FOR",
                "id": "0x767b0ada9bf5c622e261447e4bb6c2c48a2acec6-86",
                "reason": null,
                "weight": 162789609234923330
            },
            {
                "choice": "FOR",
                "id": "0x768e4afbb8e8a8252aca1d35b6b2537e3df3caa4-86",
                "reason": null,
                "weight": 1002335369085796400
            },
            {
                "choice": "FOR",
                "id": "0x779f1e5be083cceb662e374cdeeb2980dd2f28e2-86",
                "reason": null,
                "weight": 202763960300194850
            },
            {
                "choice": "FOR",
                "id": "0x78bdef852cb0433e9b88131abaafe60216e3468d-86",
                "reason": null,
                "weight": 170345966891540380
            },
            {
                "choice": "FOR",
                "id": "0x79afad092bfa828cf3be5b6929c55b799f54433b-86",
                "reason": null,
                "weight": 172391837451760000
            },
            {
                "choice": "FOR",
                "id": "0x7ac904158364df426069e9a341371236e28e73e8-86",
                "reason": null,
                "weight": 130129508409152660
            },
            {
                "choice": "FOR",
                "id": "0x7ae109a63ff4dc852e063a673b40bed85d22e585-86",
                "reason": null,
                "weight": 1250297080000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x7bb9dccc97052ddef05141897fe8313fd4ad0418-86",
                "reason": null,
                "weight": 16585224809275220000
            },
            {
                "choice": "FOR",
                "id": "0x7ec9572e8717a05425f8415c41cffca23e3044ce-86",
                "reason": null,
                "weight": 167699312907921570
            },
            {
                "choice": "FOR",
                "id": "0x80db00996d7a86c5c238ae8e35e5d3d6f4692e8d-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8108bf9834b26e6272823437324caeaab8aae99d-86",
                "reason": null,
                "weight": 1652537757465360000
            },
            {
                "choice": "FOR",
                "id": "0x8178e58b1eeea0839b869af8da0de2bef5688c5b-86",
                "reason": null,
                "weight": 48483001515903340000
            },
            {
                "choice": "FOR",
                "id": "0x81bcc6a163a5fe2562308e51acb2a5a6d90dea71-86",
                "reason": "ankandrop",
                "weight": 2200000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x842101df68b62bd545030f5053bb0e20fbb1e0b1-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x84698c0b87691eebbb4a11ab20c49916e0d7ecd9-86",
                "reason": null,
                "weight": 144547868929571300
            },
            {
                "choice": "FOR",
                "id": "0x8521d201de08630de15483c723cfc872d3bd2a38-86",
                "reason": null,
                "weight": 184601163092172670
            },
            {
                "choice": "FOR",
                "id": "0x86894f895747047e55c66b991b9a08293877e129-86",
                "reason": null,
                "weight": 163040127707720580
            },
            {
                "choice": "ABSTAIN",
                "id": "0x8787fc2de4de95c53e5e3a4e5459247d9773ea52-86",
                "reason": null,
                "weight": 1461322083093583000000000
            },
            {
                "choice": "FOR",
                "id": "0x8aaab6e7cc693cf9f1fba1ca1afb46cd9b56ad55-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x8abfdd1563ca17eb9b180ac271f05d5dd035441a-86",
                "reason": null,
                "weight": 2200000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x8c98c5cdf17ca4db1b2b322adbebea50d55f0fd6-86",
                "reason": null,
                "weight": 149650760789938240
            },
            {
                "choice": "FOR",
                "id": "0x8d1509e0240eba23cccd58941fa2b5d7ff1fc70f-86",
                "reason": "believe it's worth adjusting ",
                "weight": 1019922754705676500
            },
            {
                "choice": "FOR",
                "id": "0x909cc7e298a0a3920131cbea25a1267af724dedc-86",
                "reason": null,
                "weight": 194424443180759230
            },
            {
                "choice": "FOR",
                "id": "0x90a997e64bbe3221ee1ebb4e70e2d72c1eac4a7f-86",
                "reason": null,
                "weight": 500000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0x90df6c57bdd4f9c21b54a37b1596d8b28214a1f8-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x913d97ea3f35f5e7426495c32fab629c703b2a26-86",
                "reason": null,
                "weight": 111300308164878720
            },
            {
                "choice": "FOR",
                "id": "0x914db993837caf8ae9be38afbd9f162e6dd2f786-86",
                "reason": null,
                "weight": 201076490021735260
            },
            {
                "choice": "FOR",
                "id": "0x944308ee1922ece9838ae43b041f6c931de1b3a9-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x9588b068b14e6397bb47ad3763f9fb5e2f7d7cae-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0x95c5593e13b1b57e472dbdcabf813b73d04cfd13-86",
                "reason": null,
                "weight": 133333961262280980
            },
            {
                "choice": "FOR",
                "id": "0x97b7a1f3a166ed11dd487837476286c2dc1c7591-86",
                "reason": null,
                "weight": 123995499199726850
            },
            {
                "choice": "FOR",
                "id": "0x9a0f21b00d45856bf67be52d822fa3d4f8888de8-86",
                "reason": null,
                "weight": 1227444092654563800
            },
            {
                "choice": "AGAINST",
                "id": "0x9bc170c20229d26252703c27030d2b535dfa50dd-86",
                "reason": null,
                "weight": 136837888317710770
            },
            {
                "choice": "FOR",
                "id": "0x9e41b73693c664d81a2ed418dba2193417783054-86",
                "reason": null,
                "weight": 113882684120971200
            },
            {
                "choice": "FOR",
                "id": "0xa2538488098e73528e5d1bb7ccb5711a6453458f-86",
                "reason": null,
                "weight": 191120087596487840
            },
            {
                "choice": "FOR",
                "id": "0xa652c2c693d0cee3c1cd1ac799c1a5ccd9cb8f9f-86",
                "reason": null,
                "weight": 415290639227938100
            },
            {
                "choice": "FOR",
                "id": "0xa6e8772af29b29b9202a073f8e36f447689beef6-86",
                "reason": null,
                "weight": 2501290264423367300000000
            },
            {
                "choice": "FOR",
                "id": "0xa744d928a9c1ca6849e39db9adcfcd689f325714-86",
                "reason": null,
                "weight": 378889601103316030
            },
            {
                "choice": "FOR",
                "id": "0xa8293dd8eb52564a35b8357a539146321b934153-86",
                "reason": null,
                "weight": 32941026986416714000
            },
            {
                "choice": "FOR",
                "id": "0xa8d3a2c3e191306e7544e5fb7130a6c0eee2360b-86",
                "reason": null,
                "weight": 135538616002496540
            },
            {
                "choice": "FOR",
                "id": "0xa8e17be2b11e744561859c9c31ea060ee30bf37c-86",
                "reason": null,
                "weight": 9485005354442732
            },
            {
                "choice": "FOR",
                "id": "0xa8ec567d5384070cf1b52a79690fe8407ad18698-86",
                "reason": null,
                "weight": 3609377036715782700
            },
            {
                "choice": "FOR",
                "id": "0xa987e15c7df53b4c44009f2b3c8b02dda9e4e640-86",
                "reason": null,
                "weight": 110842300155799970
            },
            {
                "choice": "FOR",
                "id": "0xaa30037cdd4aa927a3b4df9065e662ebd73a2f53-86",
                "reason": null,
                "weight": 3434587510437592000
            },
            {
                "choice": "FOR",
                "id": "0xaac35d953ef23ae2e61a866ab93dea6ec0050bcd-86",
                "reason": null,
                "weight": 406623649978093500000000
            },
            {
                "choice": "FOR",
                "id": "0xadd2f9a2c8b74cfb1b8e8fd563531a46b86a8995-86",
                "reason": null,
                "weight": 432598688070882900
            },
            {
                "choice": "FOR",
                "id": "0xae80000916925cf8770039959ba7eee0638b31d9-86",
                "reason": null,
                "weight": 113761501446648290
            },
            {
                "choice": "AGAINST",
                "id": "0xaf05b88ac16ad3272d7ade699db51d03c4ff9f91-86",
                "reason": null,
                "weight": 338882697840930800
            },
            {
                "choice": "FOR",
                "id": "0xb1829945d221aeb8d72b4c481e16f0e0b625b4b2-86",
                "reason": null,
                "weight": 327674090993988900
            },
            {
                "choice": "FOR",
                "id": "0xb2eff458178e341cc6e3f5ec95d52c9d91ec4ace-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb3313b023e68cda95d7b625200e1b0fe6335a0c2-86",
                "reason": null,
                "weight": 33054824272283374000
            },
            {
                "choice": "FOR",
                "id": "0xb331abd0e1e1b6c3ddd2cedf95c19b6a0fba7174-86",
                "reason": null,
                "weight": 115752800953089580
            },
            {
                "choice": "FOR",
                "id": "0xb35659cbac913d5e4119f2af47fd490a45e2c826-86",
                "reason": "The Event Horizon Community voted FOR on this Proposal (ehUNI-57): EventHorizon.vote/vote/uniswap/ehUNI-57",
                "weight": 9055058715122288000000
            },
            {
                "choice": "FOR",
                "id": "0xb37bf6dbd3757db9024cd6fb8f43075e4b4c1594-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb49f8b8613be240213c1827e2e576044ffec7948-86",
                "reason": null,
                "weight": 2500597954562634000000000
            },
            {
                "choice": "FOR",
                "id": "0xb5ea7ce98dbd885f71360309831958c2e3faa037-86",
                "reason": null,
                "weight": 146805359051496800
            },
            {
                "choice": "FOR",
                "id": "0xb72838a0d6ce557621548669483d466cdaa7a1bc-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xb7771f70633c7e54e61dd38d01c26da0e86be1a5-86",
                "reason": null,
                "weight": 1003761601952090000000000
            },
            {
                "choice": "FOR",
                "id": "0xb79294d00848a3a4c00c22d9367f19b4280689d7-86",
                "reason": null,
                "weight": 4794544884010002000000
            },
            {
                "choice": "FOR",
                "id": "0xb83405aaee2a54a08022403939736bf5b33510e1-86",
                "reason": null,
                "weight": 22662122720000000000
            },
            {
                "choice": "FOR",
                "id": "0xb933aee47c438f22de0747d57fc239fe37878dd1-86",
                "reason": null,
                "weight": 2747007573374473000000000
            },
            {
                "choice": "FOR",
                "id": "0xb986f24a3658b5ee7dd5885c32c7c4ad7b982175-86",
                "reason": null,
                "weight": 134173659865504320
            },
            {
                "choice": "FOR",
                "id": "0xbe6e0481e9fce3145977da0fa41d10269138d2a6-86",
                "reason": null,
                "weight": 231215451923729600
            },
            {
                "choice": "FOR",
                "id": "0xbec643bd5b7f5e9190617ca4187ef0455950c51c-86",
                "reason": null,
                "weight": 5000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xbf477b0e6419630e2cd8f33905fe76538686e812-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc0630766b1a2f0f3df022573ecb32150c4d56811-86",
                "reason": null,
                "weight": 18330920221221876000000
            },
            {
                "choice": "FOR",
                "id": "0xc161a6f92b4561068f5996b8f835a37a284d7362-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc1e8bcd06f0336bdae77bafe980d6c67c07ebb3c-86",
                "reason": null,
                "weight": 195265793024288540
            },
            {
                "choice": "FOR",
                "id": "0xc2cb4442a5e7046ac28fad475feced67eec7f660-86",
                "reason": null,
                "weight": 1300000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc4cfa2ac48a2e7ecc101942246c3ec4bc888a357-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc6404f24db2f573f07f3a60758765caad198c0c3-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xc6c1a1ed90734ebe88b1a38da59974db5f0bfbd2-86",
                "reason": null,
                "weight": 408393434813450600
            },
            {
                "choice": "FOR",
                "id": "0xc6d7208dadee4f431bd0f3f11e7d4c91ff51bfb2-86",
                "reason": null,
                "weight": 1111000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc75d1d06f66556963bfc7648605a719793182391-86",
                "reason": null,
                "weight": 700000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xc7633c8da4783ed7f08802dea2c0eebaedd40010-86",
                "reason": null,
                "weight": 137915824558149360
            },
            {
                "choice": "FOR",
                "id": "0xc9ff715ff5fde21a10c8054085a756ce098fe896-86",
                "reason": null,
                "weight": 204892750941943550
            },
            {
                "choice": "FOR",
                "id": "0xca4157455a6e4fa063cc17389e44ed4d18cf9324-86",
                "reason": null,
                "weight": 112986996122673700
            },
            {
                "choice": "FOR",
                "id": "0xce5dfbd002b3607fcb3483ea497128d0875f0f9c-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xcf1bc800c84adc125f4d565da41e1740c2461abb-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd159333482846df61864220f58245e86de348cc7-86",
                "reason": null,
                "weight": 77631512310148930
            },
            {
                "choice": "FOR",
                "id": "0xd2602c7bdfc9f413974e944280bbfae275d1b1b6-86",
                "reason": null,
                "weight": 1069979970235306100
            },
            {
                "choice": "FOR",
                "id": "0xd2f931fbaaa5b39f14c147f843bbf1a13186399c-86",
                "reason": null,
                "weight": 526956003379285600
            },
            {
                "choice": "FOR",
                "id": "0xd368cfd095fdc0452dd7c4fde1770c0b55b9bb1a-86",
                "reason": null,
                "weight": 113602378650263650
            },
            {
                "choice": "FOR",
                "id": "0xd5300c629725287b37aed9039e914930edecb4f3-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xd6365f8efa0039923983355ee12b1d0694e7b468-86",
                "reason": null,
                "weight": 143508161248131460
            },
            {
                "choice": "FOR",
                "id": "0xd6368d2e97695a30678e5ec2668f23c05320522e-86",
                "reason": null,
                "weight": 142817244572586910
            },
            {
                "choice": "FOR",
                "id": "0xd6b8d0e159b29074a5df734e590c9010a0069b80-86",
                "reason": null,
                "weight": 2031686506419111400
            },
            {
                "choice": "FOR",
                "id": "0xd8dea87ddcc0c3c1464ded6102e4d3e829d0ae41-86",
                "reason": null,
                "weight": 1657313873315690000
            },
            {
                "choice": "FOR",
                "id": "0xd912308af7b7bdad857587e95aafa0cb1816f85f-86",
                "reason": null,
                "weight": 128137422769834030
            },
            {
                "choice": "FOR",
                "id": "0xd9995dabb781dcc8ec408fea5f293712febf17db-86",
                "reason": null,
                "weight": 159693942462662200
            },
            {
                "choice": "FOR",
                "id": "0xdbf4dca76994d8b6766b0b274dd2749279fa80b5-86",
                "reason": null,
                "weight": 415973096273879200
            },
            {
                "choice": "FOR",
                "id": "0xdc1f98682f4f8a5c6d54f345f448437b83f5e432-86",
                "reason": null,
                "weight": 2500000000000000000000000
            },
            {
                "choice": "FOR",
                "id": "0xdcb8e5aa4cc53960bdf462ad62c85414b3dcce6a-86",
                "reason": null,
                "weight": 1275624613718212400
            },
            {
                "choice": "FOR",
                "id": "0xdd4098207af1d675b690053f0057a5d97d8b1c88-86",
                "reason": null,
                "weight": 229507855318600260
            },
            {
                "choice": "AGAINST",
                "id": "0xdeb0db31a30104880be8e9940d3d4d47f4c56976-86",
                "reason": null,
                "weight": 148238917706671200
            },
            {
                "choice": "FOR",
                "id": "0xe0058debe124e5297e6c97c3bb9cd0dc504159d8-86",
                "reason": null,
                "weight": 148576639079013630
            },
            {
                "choice": "FOR",
                "id": "0xe10a296a7235ac9d278e87d5837aae318823390f-86",
                "reason": null,
                "weight": 100871071585239070
            },
            {
                "choice": "FOR",
                "id": "0xe22817a91a14d61cb3691954983663425f5513b1-86",
                "reason": null,
                "weight": 187110153155401500000
            },
            {
                "choice": "FOR",
                "id": "0xe5bde866b2dd33a2aec4c2ca2dd446a084397091-86",
                "reason": null,
                "weight": 150047389746581860
            },
            {
                "choice": "FOR",
                "id": "0xe6fd1a77021ab0c22a25382a07841e30dcd38df5-86",
                "reason": null,
                "weight": 222099277070488740
            },
            {
                "choice": "FOR",
                "id": "0xe78b74ed188528e1ec02f393e3064c8054512574-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xe7eb2dc54dcda3891d65e2cc40966c3dbf07b717-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xe93d59cc0bcecfd4ac204827ef67c5266079e2b5-86",
                "reason": null,
                "weight": 2500654380783741000000000
            },
            {
                "choice": "FOR",
                "id": "0xec08723845698a885ffc38385c1f3afef3da0ae0-86",
                "reason": null,
                "weight": 222961597562935580
            },
            {
                "choice": "FOR",
                "id": "0xec875ece06ab6506551ed0951baa3c160b9da9a9-86",
                "reason": null,
                "weight": 308572355662619970
            },
            {
                "choice": "FOR",
                "id": "0xecc2a9240268bc7a26386ecb49e1befca2706ac9-86",
                "reason": null,
                "weight": 2503920676298366000000000
            },
            {
                "choice": "FOR",
                "id": "0xed11e5ea95a5a3440fbaadc4cc404c56d0a5bb04-86",
                "reason": "https://gov.uniswap.org/t/she256-delegate-platform/25204/6?u=she256",
                "weight": 2500965718297016000000000
            },
            {
                "choice": "FOR",
                "id": "0xee3b9acdfd7eabaef84b7ea69067233b90874d02-86",
                "reason": null,
                "weight": 75882505115427440
            },
            {
                "choice": "FOR",
                "id": "0xefa9524ac8703db3a172c605210936a15ec166b1-86",
                "reason": null,
                "weight": 160181575086488420
            },
            {
                "choice": "FOR",
                "id": "0xefdb9ba6b79e76f9e2bf937bba861fe110143c77-86",
                "reason": null,
                "weight": 7913043957022792000
            },
            {
                "choice": "FOR",
                "id": "0xf070cd4b5ba73a6b6a939dde513f79862bffcd25-86",
                "reason": null,
                "weight": 14942500000000000000
            },
            {
                "choice": "FOR",
                "id": "0xf1877ddcdd6458529abfa77c522b441811bb9f94-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xf51754d95c0b9bb416ab4915e9f10b04d04d29e5-86",
                "reason": null,
                "weight": 3824194520647374000
            },
            {
                "choice": "FOR",
                "id": "0xf61be0b61add54ba360756528f24c4f982e6ad52-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "AGAINST",
                "id": "0xf6a0d4088824a5f5cb80d379a8ec462643e47a3b-86",
                "reason": null,
                "weight": 114590666462885280
            },
            {
                "choice": "FOR",
                "id": "0xf6dc93dcaa16b1d48eb9929b9a8830331c89963a-86",
                "reason": null,
                "weight": 198740861399058800
            },
            {
                "choice": "FOR",
                "id": "0xf857c7e5c41d49b7f68a612f7289890a703162e4-86",
                "reason": null,
                "weight": 160828720848196540
            },
            {
                "choice": "FOR",
                "id": "0xf9551c66995ed3ff9bb05c9fd7ff148bd75dc99a-86",
                "reason": null,
                "weight": 250011547134276450000000
            },
            {
                "choice": "FOR",
                "id": "0xf96cfed3897381c92f6deb95f06d4da5b5b2998f-86",
                "reason": null,
                "weight": 133645718527634200
            },
            {
                "choice": "FOR",
                "id": "0xfb0f0c37a3452c6a4a2a7d45d453a391b305fe5a-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xfb4204f6aee2f6a3377167207dfb4a224320bfd1-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xfc284bce16967548b9636f405646e21bae6b25d4-86",
                "reason": null,
                "weight": 0
            },
            {
                "choice": "FOR",
                "id": "0xfd52fb43fec22181294482c5c0cdfc7a621884ae-86",
                "reason": null,
                "weight": 145137443477582460
            },
            {
                "choice": "FOR",
                "id": "0xfd7f25a9a5404223fe7d5bf5f9547b0108961760-86",
                "reason": null,
                "weight": 140594134579778290
            },
            {
                "choice": "AGAINST",
                "id": "0xff71447b5f1eb39b502eca9783cd5ddaf6b7b3eb-86",
                "reason": null,
                "weight": 137806763623960850
            },
            {
                "choice": "FOR",
                "id": "0xfffd05ae9db4d5f4e23e2f37395db2f87359bf5d-86",
                "reason": null,
                "weight": 5495994997649237000
            }
        ]
    }
]