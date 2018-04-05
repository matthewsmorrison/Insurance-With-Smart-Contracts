import binascii
filename = 'future-flight-ASCII.proof'
with open(filename, 'rb') as f:
    content = f.read()
print("file read")
hexStr = binascii.hexlify(content)
print(hexStr)
hexStrDel = ""
for i in range(len(hexStr)):
    #print("str", hexStrDel)
    if (i % 2) == 0:
        hexStrDel += r"\x"
    hexStrDel += hexStr[i]
print(hexStrDel)
