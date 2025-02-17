import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useState, useRef } from 'react';
import React from 'react'
import { Select } from 'src/ui/select';
import { OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const sideBar = useRef(null);
	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside ref={ sideBar } className={styles.container} style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
}
