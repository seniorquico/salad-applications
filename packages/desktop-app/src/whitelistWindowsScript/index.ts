// script.ps1 is our regular script to whitelist windows defender. We used compress-script.ps1 to compress it into the long EncodedCommand you see below.
export const powershellWhitelistCommand =
  'PowerShell.exe -NoLogo -NoProfile -NonInteractive -WindowStyle Hidden -EncodedCommand WwBTAHkAcwB0AGUAbQAuAFQAZQB4AHQALgBFAG4AYwBvAGQAaQBuAGcAXQA6ADoAVQBUAEYAOAAuAEcAZQB0AFMAdAByAGkAbgBnACgAWwBTAHkAcwB0AGUAbQAuAEMAbwBuAHYAZQByAHQAXQA6ADoARgByAG8AbQBCAGEAcwBlADYANABTAHQAcgBpAG4AZwAoACgAJwB7ACIAUwBjAHIAaQBwAHQAIgA6ACIAYQBXAFkAZwBLAEYAdAB6AGQASABKAHAAYgBtAGQAZABPAGoAcABKAGMAMAA1ADEAYgBHAHgAUABjAGsAVgB0AGMASABSADUASwBDAFIARgBiAG4AWQA2AFYAMABoAEoAVgBFAFYATQBTAFYATgBVAFgAMABSAEoAVQBpAGsAcABJAEgAcwBOAEMAaQBBAGcAWgBYAGgAcABkAEMAQQB4AEQAUQBwADkARABRAG8ATgBDAGkAUgBwAEkARAAwAGcAVABtAFYAMwBMAFUAOQBpAGEAbQBWAGoAZABDAEIAVABlAFgATgAwAFoAVwAwAHUAUgBHAGwAaABaADIANQB2AGMAMwBSAHAAWQAzAE0AdQBVAEgASgB2AFkAMgBWAHoAYwAxAE4AMABZAFgASgAwAFMAVwA1AG0AYgB3ADAASwBKAEcAawB1AFEAWABKAG4AZABXADEAbABiAG4AUgB6AEkARAAwAGcASQBrAEYAawBaAEMAMQBOAGMARgBCAHkAWgBXAFoAbABjAG0AVgB1AFkAMgBVAGcATABVAFYANABZADIAeAAxAGMAMgBsAHYAYgBsAEIAaABkAEcAZwBnAFkAQwBJAGsAZQAwAFYAdQBkAGoAcABYAFMARQBsAFUAUgBVAHgASgBVADEAUgBmAFIARQBsAFMAZgBXAEEAaQBJAGcAMABLAEoARwBrAHUAUQAzAEoAbABZAFgAUgBsAFQAbQA5AFgAYQBXADUAawBiADMAYwBnAFAAUwBBAGsAWgBtAEYAcwBjADIAVQBOAEMAaQBSAHAATABrAFoAcABiAEcAVgBPAFkAVwAxAGwASQBEADAAZwBKADMAQgB2AGQAMgBWAHkAYwAyAGgAbABiAEcAdwB1AFoAWABoAGwASgB3ADAASwBKAEcAawB1AFYAWABOAGwAVQAyAGgAbABiAEcAeABGAGUARwBWAGoAZABYAFIAbABJAEQAMABnAEoASABSAHkAZABXAFUATgBDAGkAUgBwAEwAbABaAGwAYwBtAEkAZwBQAFMAQQBuAGMAbgBWAHUAUQBYAE0AbgBEAFEAbwBrAGMAQwBBADkASQBFADUAbABkAHkAMQBQAFkAbQBwAGwAWQAzAFEAZwBVADMAbAB6AGQARwBWAHQATABrAFIAcABZAFcAZAB1AGIAMwBOADAAYQBXAE4AegBMAGwAQgB5AGIAMgBOAGwAYwAzAE0ATgBDAGkAUgB3AEwAbABOADAAWQBYAEoAMABTAFcANQBtAGIAeQBBADkASQBDAFIAcABEAFEAcAAwAGMAbgBrAGcAZQB3ADAASwBJAEMAQQBrAGMAQwA1AFQAZABHAEYAeQBkAEMAZwBwAEQAUQBwADkASQBHAE4AaABkAEcATgBvAEkASABzAE4AQwBpAEEAZwBKAEcAVQBnAFAAUwBBAGsAUgBYAEoAeQBiADMASgBiAE0ARgAwAE4AQwBpAEEAZwBhAFcAWQBnAEsAQwBSAGwASQBDADEAdQBaAFMAQQBrAGIAbgBWAHMAYgBDAEEAdABZAFcANQBrAEkAQwBSAGwATABrAFYANABZADIAVgB3AGQARwBsAHYAYgBpAEEAdABiAG0AVQBnAEoARwA1ADEAYgBHAHcAZwBMAFcARgB1AFoAQwBBAGsAWgBTADUARgBlAEcATgBsAGMASABSAHAAYgAyADQAdQBTAFcANQB1AFoAWABKAEYAZQBHAE4AbABjAEgAUgBwAGIAMgA0AGcATABXADUAbABJAEMAUgB1AGQAVwB4AHMASQBDADEAaABiAG0AUQBnAEoARwBVAHUAUgBYAGgAagBaAFgAQgAwAGEAVwA5AHUATABrAGwAdQBiAG0AVgB5AFIAWABoAGoAWgBYAEIAMABhAFcAOQB1AEwAawA1AGgAZABHAGwAMgBaAFUAVgB5AGMAbQA5AHkAUQAyADkAawBaAFMAQQB0AGIAbQBVAGcASgBHADUAMQBiAEcAdwBwAEkASABzAE4AQwBpAEEAZwBJAEMAQgBsAGUARwBsADAASQBDAFIAbABMAGsAVgA0AFkAMgBWAHcAZABHAGwAdgBiAGkANQBKAGIAbQA1AGwAYwBrAFYANABZADIAVgB3AGQARwBsAHYAYgBpADUATwBZAFgAUgBwAGQAbQBWAEYAYwBuAEoAdgBjAGsATgB2AFoARwBVAE4AQwBpAEEAZwBmAFMAQgBsAGIASABOAGwASQBIAHMATgBDAGkAQQBnAEkAQwBCAGwAZQBHAGwAMABJAEQARQBOAEMAaQBBAGcAZgBRADAASwBmAFEAMABLACIAfQAnACAAfAAgAEMAbwBuAHYAZQByAHQARgByAG8AbQAtAEoAcwBvAG4AKQAuAFMAYwByAGkAcAB0ACkAKQAgAHwAIABpAGUAeAA= -ExecutionPolicy Bypass'