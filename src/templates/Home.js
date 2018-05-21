import React from 'react';

export const Home = () => (
	<div>


		{/* Banner 


		<div className="container">
			<div id="banner">
				<h2> <strong> FlightSafe: </strong> Decentralised
				<br/> peer-to-peer flight insurance service </h2>
	
				<a href="/faq" className="button big icon fa-check-circle">Learn More</a>
			</div>
		 </div>
		*/}


	{/* Wrapper */}
		<div className="wrapper style1">
			<div className="inner">

					{/* One */}
						<section className="container box feature1">
							<div className="row">
								<div className="12u">
									<header className="first major">
										<h2>FlightSafe</h2>
										<p> First ever decentralised peer-to-peer <strong>flight insurance service</strong></p>
									</header>
								</div>
							</div>

							<div className="row">
								<div className="4u 12u(mobile)">
									<section>
										<a href="/create_insurance" className="image featured"><img src="images/sky.jpg" alt="" /></a>
										<header className="second icon fa-user">
											<h3> Request Insurance </h3>
											<p>  for your next flight</p>
										</header>
									</section>
								</div>
								<div className="4u 12u(mobile)">
									<section>
										<a href="/invest" className="image featured"><img src="images/hands.jpg" alt="" /></a>
										<header className="second icon fa-bar-chart-o">
											<h3> Invest </h3>
											<p>in available requests</p>
										</header>
									</section>
								</div>
								<div className="4u 12u(mobile)">
									<section>
										<a href="#" className="image featured"><img src="images/requests.jpg" alt="" /></a>
										<header className="second icon fa-cog">
											<h3>Check the status</h3>
											<p>Of your past requests</p>
										</header>
									</section>
								</div>
							</div>
							<div className="row">
								<div className="12u">
									<p>This decentralised application on the Ethereum test network (Rinkeby) allows users to take out insurance with other users to protect them against cancelled flights.
				    				Using the TLS-N protocol, we allow users to verify whether flights have been cancelled or not.  We do not have pre-set templates for policies so users can dictate their own policies.</p>
								</div>
							</div>
						</section>

				</div>
			</div>
			<div className="wrapper style2">
				<div className="inner">

					{/* Two */}
						<section className="container box feature2">
							<div className="row">
								<div className="6u 12u(mobile)">
									<section>
										<header className="major">
											<h2>NO MIDDLE MAN, NO FEES</h2>
										</header>
										<p>Using the Ethereum Blockchain, our site facilitates peer-to-peer betting using automated smart contracts meaning that there is no middle man and no absolutely zero fees for users.</p>
									</section>
								</div>
								<div className="6u 12u(mobile)">
									<section>
										<header className="major">
											<h2>100% TRANSPARENT SERVICE</h2>
										</header>
										<p>All of our smart contract code can be verified in our GitHub repository meaning that you can verify everything we claim. Our smart contracts have been deployed on the Rinkeby test network at contract address 0xf2Ef82c979b671a613b560f34757283FCFDaC89d.</p>

									</section>
								</div>
							</div>
						</section>

					</div>
			</div>
		

	</div>
);