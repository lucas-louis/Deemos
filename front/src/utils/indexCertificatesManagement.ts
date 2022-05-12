import React from 'react';

import { Token } from 'types/types';

export const previousIndex = (
	index: number,
	certificates: Token[],
	setIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
	if (index - 1 < 0) {
		setIndex(certificates.length - 1);
	} else {
		setIndex(index - 1);
	}
};

export const nextIndex = (
	index: number,
	certificates: Token[],
	setIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
	if (index + 1 > certificates.length - 1) {
		setIndex(0);
	} else {
		setIndex(index + 1);
	}
};
