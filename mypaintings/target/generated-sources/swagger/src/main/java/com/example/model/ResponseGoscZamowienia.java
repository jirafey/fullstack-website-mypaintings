package com.example.model;

import java.util.Objects;
import com.example.model.ResponseGoscZamowieniaZamowienia;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseGoscZamowienia
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseGoscZamowienia   {
  @JsonProperty("zamowienia")
  @Valid
  private List<ResponseGoscZamowieniaZamowienia> zamowienia = null;

  public ResponseGoscZamowienia zamowienia(List<ResponseGoscZamowieniaZamowienia> zamowienia) {
    this.zamowienia = zamowienia;
    return this;
  }

  public ResponseGoscZamowienia addZamowieniaItem(ResponseGoscZamowieniaZamowienia zamowieniaItem) {
    if (this.zamowienia == null) {
      this.zamowienia = new ArrayList<>();
    }
    this.zamowienia.add(zamowieniaItem);
    return this;
  }

  /**
   * Get zamowienia
   * @return zamowienia
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseGoscZamowieniaZamowienia> getZamowienia() {
    return zamowienia;
  }

  public void setZamowienia(List<ResponseGoscZamowieniaZamowienia> zamowienia) {
    this.zamowienia = zamowienia;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseGoscZamowienia responseGoscZamowienia = (ResponseGoscZamowienia) o;
    return Objects.equals(this.zamowienia, responseGoscZamowienia.zamowienia);
  }

  @Override
  public int hashCode() {
    return Objects.hash(zamowienia);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseGoscZamowienia {\n");
    
    sb.append("    zamowienia: ").append(toIndentedString(zamowienia)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
