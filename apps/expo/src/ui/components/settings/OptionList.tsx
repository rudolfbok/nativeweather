import { useStorageString } from '@/core';
import { useTranslate } from '@tolgee/react';
import { getSettingOption, optionLabel } from './options';
import type { SettingOptionKey } from './options';
import { RoundView } from '../common/RoundView';
import { SettingsRow } from './SettingsRow';

/** The choices of one setting (theme, language, temperature, units, AQI), the selected one checked. */
export const OptionList = ({ option }: { option: SettingOptionKey }) => {
	const { t } = useTranslate('settings');
	const { storageKey, values, valueTileClassName } = getSettingOption(option);
	const [current, setCurrent] = useStorageString(storageKey);

	return (
		<RoundView>
			{values.map((item, index) => (
				<SettingsRow
					key={item.value}
					icon={item.icon}
					tileClassName={valueTileClassName}
					title={`${optionLabel(t, item)}${item.hint ?? ''}`}
					selected={current === item.value}
					border={index < values.length - 1}
					onPress={() => setCurrent(item.value)}
				/>
			))}
		</RoundView>
	);
};
