# Functions

<dl>
<dt><a href="#Interface">Interface(...expected)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a type to check value against with the <code>instanceof</code> operator.</p>
</dd>
<dt><a href="#match">match(expected, values)</a> ⇒ <code>Array.&lt;*&gt;</code></dt>
<dd><p>Ensures the given values match the expected interfaces.</p>
</dd>
</dl>

<a name="Interface"></a>

# Interface(...expected) ⇒ <code>Object</code>
Returns a type to check value against with the `instanceof` operator.

**Kind**: global function  
**Returns**: <code>Object</code> - A type to verify value against with the `instanceof` operator.  

| Param | Type | Description |
| --- | --- | --- |
| ...expected | <code>\*</code> | The value expected types. |

<a name="match"></a>

# match(expected, values) ⇒ <code>Array.&lt;\*&gt;</code>
Ensures the given values match the expected interfaces.

**Kind**: global function  
**Returns**: <code>Array.&lt;\*&gt;</code> - The matched values or their default values.  
**Throws**:

- <code>TypeError</code> Whenever not enough values are given and no default values are available to complete.
- <code>TypeError</code> Whenever a value does not match any of its interfaces and no default value is available.


| Param | Type | Description |
| --- | --- | --- |
| expected | <code>Array.&lt;(\*\|Array.&lt;\*&gt;)&gt;</code> | An array-like of interfaces w/ optional default, to match the values against. |
| values | <code>Array.&lt;\*&gt;</code> | An array-like of values to match. |

