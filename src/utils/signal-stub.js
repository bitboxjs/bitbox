export default function getSignalStub(signalName) {
    function stubSignal() {
        // TODO: improve wording, provide at least component and signal names in warning
        console.warn('Cerebral - it is not supposed to run signals with ServerController.')
    }

    stubSignal.signalName = signalName

    return stubSignal
}
