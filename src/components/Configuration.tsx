import { Button, Group, Input, NumberInput, SegmentedControl, Stack, Space } from '@mantine/core';

type configurationProps = {
    config: Config,
    setConfig: (config: Config) => void,
    onSubmit: () => void,
    onDiscard: () => void
}

function Configuration({ config, setConfig, onSubmit, onDiscard }: configurationProps) {
    const onTimeModeChange = (value: string) => {
        setConfig({
            ...config,
            timeMode: value
        });
    };

    const onTimeLimitChange = (value: number | string)=> {
        setConfig({
            ...config,
            timeLimit: value as number
        });
    };

    return (
        <Stack align='flex-start' justify='flex-start'>
            <Input.Wrapper label='Time Mode'>
                <SegmentedControl
                    fullWidth
                    value={config.timeMode}
                    onChange={onTimeModeChange}
                    data={[
                        { label: 'Untimed', value: 'untimed'},
                        { label: 'Timed', value: 'timed'},
                        { label: 'Stopwatch', value: 'stopwatch'}
                    ]}/>
            </Input.Wrapper>
            <NumberInput
                label='Time Limit'
                suffix='s'
                allowNegative={false}
                allowDecimal={false}
                min={3}
                max={120}
                clampBehavior='blur'
                disabled={config.timeMode == 'timed' ? false : true}
                value={config.timeLimit}
                onChange={onTimeLimitChange}
            />
            <Space/>
            <Group>
                <Button variant='filled' onClick={onSubmit}>Save Changes</Button>
                <Button variant='outline' onClick={onDiscard}>Discard Changes</Button>
            </Group>
        </Stack>
    );
}

export default Configuration;