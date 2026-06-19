import type { FormattedDonation, Total } from '@gdq/types/tracker';
import { ChannelProps, registerChannel } from '../channels';
import { useRef } from 'react';

import { useListenFor, useReplicant } from 'use-nodecg';
import styled from '@emotion/styled';
import TweenNumber from '@gdq/lib/components/TweenNumber';

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

registerChannel('Dark Souls', 1337, DarkSouls, {
	position: 'bottomLeft',
	site: 'GitHub',
	handle: 'Nevets10',
});

function DarkSouls(props: ChannelProps) {
	const [total] = useReplicant<Total | null>('total', null);
	const cameoRef = useRef<HTMLDivElement>(null);

	useListenFor('donation', (donation: FormattedDonation) => {
		/**
		 * Respond to a donation.
		 */
	});

	return (
		<Container>
			<Video controls={false} autoPlay={true} loop={true} src={bRoll}></Video>
			<CameoWrapper ref={cameoRef}></CameoWrapper>
			<Video controls={false} autoPlay={true} loop={true} src={mainChar}></Video>
			<TotalEl>
				$<TweenNumber value={Math.floor(total?.raw ?? 0)} />
			</TotalEl>
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
		src: url('./fonts/EBGaramond-Regular.ttf');
	}

	font-family: darkSoulsFont;
	font-size: 46px;
	color: white;

	position: absolute;

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

const CameoWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
`;
