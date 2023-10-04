package com.sss.tally.global.web;

import org.apache.commons.text.StringEscapeUtils;

import com.fasterxml.jackson.core.SerializableString;
import com.fasterxml.jackson.core.io.CharacterEscapes;
import com.fasterxml.jackson.core.io.SerializedString;

public class HtmlCharacterEscapes extends CharacterEscapes {
	private final int[] asciiEscapes;

	public HtmlCharacterEscapes(){
		asciiEscapes = CharacterEscapes.standardAsciiEscapesForJSON();
		asciiEscapes['<'] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes['>'] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes['\"'] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes['('] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes[')'] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes['#'] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes['\''] = CharacterEscapes.ESCAPE_CUSTOM;
	}

	@Override
	public int[] getEscapeCodesForAscii(){
		return asciiEscapes;
	}

	@Override
	public SerializableString getEscapeSequence(int ch){
		char charAt = (char) ch;
		if (Character.isHighSurrogate(charAt) || Character.isLowSurrogate(charAt)) {
			StringBuilder sb = new StringBuilder();
			sb.append("\\u");
			sb.append(String.format("%04x", ch));
			return new SerializedString(sb.toString());
		} else {
			return new SerializedString(StringEscapeUtils.escapeHtml4(Character.toString(charAt)));
		}
	}
}
