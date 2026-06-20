import { useRef, useState } from 'react';
import type { FormattedDonation, Total } from '@gdq/types/tracker';
import { ChannelProps, registerChannel } from '../channels';

import { useListenFor, useReplicant } from 'use-nodecg';
import styled from '@emotion/styled';
import TweenNumber from '@gdq/lib/components/TweenNumber';

//import font
import dsFont from './fonts/EBGaramond-Regular.ttf';

// import videos
import bRoll from './videos/b-roll.webm';
import mainChar from './videos/main-char.webm';
import dad from './videos/dad.webm';
import kirk from './videos/kirk.webm';
import lautrec from './videos/lautrec.webm';
import logan from './videos/logan.webm';
import mindblank from './videos/mindblank.webm';
import siegmeyer from './videos/siegmeyer.webm';
import solaire from './videos/solaire.webm';
import havel from './videos/havel.webm';
import chester from './videos/chester.webm';
import artorias from './videos/artorias.webm';
import ninja1 from './videos/ninja1.webm';
import ninja2 from './videos/ninja2.webm';

// import images
import healthBar from './img/heath-bar.png';
import items from './img/items.png';
import souls from './img/souls.png';

registerChannel('Dark Souls', 1337, DarkSouls, {
	position: 'bottomLeft',
	site: 'GitHub',
	handle: 'Nevets10',
});

function DarkSouls(props: ChannelProps) {
	const [total] = useReplicant<Total | null>('total', null);
	const [cameo, setCameo] = useState<string>('');
	const cameoQueue = useRef<string[]>([]);
	const cameos: string[] = [
		dad,
		kirk,
		lautrec,
		logan,
		mindblank,
		siegmeyer,
		solaire,
		havel,
		chester,
		artorias,
		ninja1,
		ninja2,
	];

	useListenFor('donation', (donation: FormattedDonation) => {
		// Add random character to the queue after filtering the last one currently in the queue
		// The video will not play the same character back-to-back
		const filteredCameos = cameos.filter((cameo) => cameo !== cameoQueue.current[cameoQueue.current.length - 1]);
		const newCameo = filteredCameos[Math.floor(Math.random() * filteredCameos.length)];
		cameoQueue.current.push(newCameo);
		setCameo(cameoQueue.current[0]);
	});

	function handleOnEnded(): void {
		cameoQueue.current.shift();
		setCameo(cameoQueue.current[0]);
	}

	return (
		<Container>
			<Video controls={false} autoPlay={true} loop={true} src={bRoll}></Video>
			<Video controls={false} autoPlay={true} src={cameo} onEnded={handleOnEnded}></Video>
			<Video controls={false} autoPlay={true} loop={true} src={mainChar}></Video>
			<TotalWrapper>
				<TotalEl>
					$<TweenNumber value={Math.floor(total?.raw ?? 0)} />
				</TotalEl>
			</TotalWrapper>
			<HealthBar src={healthBar}></HealthBar>
			<Items src={items}></Items>
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
`;

const TotalEl = styled.div`
	@font-face {
		font-family: 'darkSoulsFont';
		src: url('${dsFont}');
	}

	font-family: darkSoulsFont;
	font-size: 46px;
	color: white;
	text-align: right;
	position: absolute;
	width: 80%;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

const Video = styled.video`
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
`;

const HealthBar = styled.img`
	position: absolute;
	padding: 0;
	margin: 10px;
`;

const Items = styled.img`
	position: absolute;
	top: 165px;
	padding: 0;
	margin-left: 25px;
`;

const TotalWrapper = styled.div`
	background-image: url('${souls}');
	width: 300px;
	height: 67px;
	text-align: right;
	position: absolute;
	top: 250px;
	margin-left: 800px;
`;
